"use client";

import { useReducer, useCallback } from "react";
import type { Question } from "@/data/types";

type Phase = "select" | "loading" | "error" | "playing" | "gameover";

type Selection = { index: number; choice: string };

type State = {
  phase: Phase;
  questions: Question[];
  questionIndex: number;
  score: number;
  selection: Selection[];
  showMessage: boolean;
  isDisabled: boolean;
  errorMessage: string;
};

type Action =
  | { type: "SELECT_CATEGORY" }
  | { type: "QUESTIONS_LOADED"; questions: Question[] }
  | { type: "LOAD_ERROR"; message: string }
  | { type: "ANSWER"; choice: string }
  | { type: "NEXT" }
  | { type: "RESET" };

const buildSelection = (length: number): Selection[] =>
  new Array(length).fill(null).map((_item, i) => ({ index: i, choice: "" }));

const initialState: State = {
  phase: "select",
  questions: [],
  questionIndex: 0,
  score: 0,
  selection: [],
  showMessage: false,
  isDisabled: false,
  errorMessage: "",
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SELECT_CATEGORY":
      return { ...initialState, phase: "loading" };

    case "QUESTIONS_LOADED":
      return {
        ...initialState,
        phase: "playing",
        questions: action.questions,
        selection: buildSelection(action.questions.length),
      };

    case "LOAD_ERROR":
      return { ...state, phase: "error", errorMessage: action.message };

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
      const isLast = state.questionIndex === state.questions.length - 1;
      if (isLast) {
        return {
          ...state,
          phase: "gameover",
          showMessage: false,
          selection: buildSelection(state.questions.length),
        };
      }
      return {
        ...state,
        questionIndex: state.questionIndex + 1,
        showMessage: false,
        isDisabled: false,
      };
    }

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

export function useTrivia() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const selectCategory = useCallback(async (category: string) => {
    dispatch({ type: "SELECT_CATEGORY" });
    try {
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Failed to generate questions.");
      }

      const data = await res.json();
      const questions: Question[] = data.questions;

      if (!Array.isArray(questions) || questions.length === 0) {
        throw new Error("No questions were returned.");
      }

      dispatch({ type: "QUESTIONS_LOADED", questions });
    } catch (error) {
      dispatch({
        type: "LOAD_ERROR",
        message: error instanceof Error ? error.message : "Something went wrong.",
      });
    }
  }, []);

  const answer = useCallback((choice: string) => {
    if (choice) dispatch({ type: "ANSWER", choice });
  }, []);

  const next = useCallback(() => dispatch({ type: "NEXT" }), []);
  const reset = useCallback(() => dispatch({ type: "RESET" }), []);

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
    isCurrentCorrect,
  };
}
