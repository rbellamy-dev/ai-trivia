"use client";

import { useReducer, useCallback, useRef } from "react";
import type { Question } from "@/data/types";

type Phase = "select" | "loading" | "error" | "playing" | "gameover";

type Selection = { index: number; choice: string };

/** How many questions a roll asks the server for. */
export const ROLL_SIZE = 10;

export type State = {
  phase: Phase;
  questions: Question[];
  questionIndex: number;
  score: number;
  selection: Selection[];
  showMessage: boolean;
  isDisabled: boolean;
  errorMessage: string;
  /** More questions are still arriving from the server. */
  streaming: boolean;
  /** "Next" was pressed before the next question arrived. */
  waiting: boolean;
};

export type Action =
  | { type: "SELECT_CATEGORY" }
  | { type: "QUESTIONS_LOADED"; questions: Question[] }
  | { type: "QUESTION_RECEIVED"; question: Question }
  | { type: "STREAM_DONE" }
  | { type: "LOAD_ERROR"; message: string }
  | { type: "ANSWER"; choice: string }
  | { type: "NEXT" }
  | { type: "RESET" }
  | { type: "RESTORE"; state: State };

const buildSelection = (length: number): Selection[] =>
  new Array(length).fill(null).map((_item, i) => ({ index: i, choice: "" }));

export const initialState: State = {
  phase: "select",
  questions: [],
  questionIndex: 0,
  score: 0,
  selection: [],
  showMessage: false,
  isDisabled: false,
  errorMessage: "",
  streaming: false,
  waiting: false,
};

/** Move on to the next question, or finish the roll if there are no more. */
const advance = (state: State): State => {
  const hasNext = state.questionIndex < state.questions.length - 1;
  if (hasNext) {
    return {
      ...state,
      questionIndex: state.questionIndex + 1,
      showMessage: false,
      isDisabled: false,
      waiting: false,
    };
  }
  if (state.streaming) return { ...state, waiting: true };
  return {
    ...state,
    phase: "gameover",
    showMessage: false,
    waiting: false,
    selection: buildSelection(state.questions.length),
  };
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SELECT_CATEGORY":
      return { ...initialState, phase: "loading", streaming: true };

    // Every question at once (no streaming).
    case "QUESTIONS_LOADED":
      return {
        ...initialState,
        phase: "playing",
        questions: action.questions,
        selection: buildSelection(action.questions.length),
      };

    // One more question streamed in. The first one starts the round; one
    // the player was waiting for is shown straight away.
    case "QUESTION_RECEIVED": {
      if (state.phase !== "loading" && state.phase !== "playing") return state;
      const questions = [...state.questions, action.question];
      const next: State = {
        ...state,
        phase: "playing",
        questions,
        selection: [...state.selection, { index: questions.length - 1, choice: "" }],
      };
      return state.waiting ? advance(next) : next;
    }

    // The server has sent everything it's going to. If nothing arrived the
    // roll failed; if the player was waiting on a question, the roll is over.
    case "STREAM_DONE": {
      if (state.phase === "loading") {
        return { ...state, phase: "error", streaming: false, errorMessage: "No questions were returned." };
      }
      const done = { ...state, streaming: false };
      return state.waiting ? advance(done) : done;
    }

    case "LOAD_ERROR":
      return { ...state, phase: "error", streaming: false, errorMessage: action.message };

    case "ANSWER": {
      // Only the first answer for a question records a choice / scores.
      if (state.isDisabled || !action.choice) {
        return { ...state, isDisabled: true, showMessage: true };
      }
      const current = state.questions[state.questionIndex];
      const isCorrect = current.answer.some((a) => a === action.choice);
      return {
        ...state,
        isDisabled: true,
        showMessage: true,
        score: isCorrect ? state.score + 1 : state.score,
        selection: state.selection.map((item, index) =>
          index === state.questionIndex
            ? { ...item, choice: action.choice }
            : item
        ),
      };
    }

    case "NEXT": {
      const answered = Boolean(state.selection[state.questionIndex]?.choice);
      if (!answered) {
        return { ...state, showMessage: true };
      }
      return advance(state);
    }

    case "RESET":
      return initialState;

    // A round saved before a page refresh. Its stream died with the page,
    // so the round continues with the questions it already has.
    case "RESTORE": {
      const restored = { ...action.state, streaming: false, waiting: false };
      // Saved while waiting on a question that never came: move on (or end).
      return action.state.waiting ? advance(restored) : restored;
    }

    default:
      return state;
  }
}

/** Reads an NDJSON body line by line. */
async function* readLines(body: ReadableStream<Uint8Array>) {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    let newline;
    while ((newline = buffer.indexOf("\n")) >= 0) {
      const line = buffer.slice(0, newline).trim();
      buffer = buffer.slice(newline + 1);
      if (line) yield line;
    }
  }
  if (buffer.trim()) yield buffer.trim();
}

export function useTrivia() {
  const [state, dispatch] = useReducer(reducer, initialState);
  // The roll being written, so leaving can cancel it instead of letting a
  // late question yank the player back into a round.
  const pending = useRef<AbortController | null>(null);

  const selectCategory = useCallback(async (category: string) => {
    pending.current?.abort();
    const controller = new AbortController();
    pending.current = controller;
    dispatch({ type: "SELECT_CATEGORY" });
    try {
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Failed to generate questions.");
      }

      // Questions arrive one per line as they're written.
      for await (const line of readLines(res.body)) {
        const msg = JSON.parse(line) as { question?: Question; done?: boolean; error?: string };
        if (msg.question) dispatch({ type: "QUESTION_RECEIVED", question: msg.question });
        if (msg.error) console.error("Question stream failed:", msg.error);
        if (msg.done || msg.error) break;
      }
      dispatch({ type: "STREAM_DONE" });
    } catch (error) {
      if (controller.signal.aborted) return;
      console.error(error);
      // Whatever already arrived still plays; STREAM_DONE fails the roll
      // only if nothing did.
      dispatch({ type: "STREAM_DONE" });
    }
  }, []);

  const answer = useCallback((choice: string) => {
    if (choice) dispatch({ type: "ANSWER", choice });
  }, []);

  const next = useCallback(() => dispatch({ type: "NEXT" }), []);
  const reset = useCallback(() => {
    pending.current?.abort();
    dispatch({ type: "RESET" });
  }, []);
  const restore = useCallback((saved: State) => dispatch({ type: "RESTORE", state: saved }), []);

  const current = state.questions[state.questionIndex];
  const currentChoice = state.selection[state.questionIndex]?.choice ?? "";
  const isCurrentCorrect = Boolean(
    current && current.answer.some((a) => a === currentChoice)
  );

  return {
    state,
    selectCategory,
    answer,
    next,
    reset,
    restore,
    isCurrentCorrect,
  };
}
