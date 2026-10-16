import { describe, expect, it } from "vitest";
import { initialState, reducer, type State } from "./useTrivia";
import type { Question } from "@/data/types";

const question: Question = {
  id: "q-1",
  question: "?",
  choices: ["Right", "Wrong", "Other", "Another"],
  answer: ["Right"],
  caption: "",
  imageAlt: "",
  photo: null,
};

const playing = (): State =>
  reducer(initialState, { type: "QUESTIONS_LOADED", questions: [question, question] });

describe("reducer: answering", () => {
  it("scores a correct answer", () => {
    const s = reducer(playing(), { type: "ANSWER", choice: "Right" });
    expect(s.score).toBe(1);
  });

  it("doesn't score a wrong answer", () => {
    const s = reducer(playing(), { type: "ANSWER", choice: "Wrong" });
    expect(s.score).toBe(0);
  });

  it("locks the first answer so it can't be scored twice", () => {
    let s = reducer(playing(), { type: "ANSWER", choice: "Wrong" });
    s = reducer(s, { type: "ANSWER", choice: "Right" });
    expect(s.score).toBe(0);
    expect(s.selection[0].choice).toBe("Wrong");
  });

  it("won't move on until the frame is answered", () => {
    const s = reducer(playing(), { type: "NEXT" });
    expect(s.questionIndex).toBe(0);
    expect(s.showMessage).toBe(true);
  });
});

describe("reducer: streaming", () => {
  const q2: Question = { ...question, id: "q-2" };
  const stream = (): State => reducer(initialState, { type: "SELECT_CATEGORY" });

  it("starts the round when the first question arrives", () => {
    const s = reducer(stream(), { type: "QUESTION_RECEIVED", question });
    expect(s.phase).toBe("playing");
    expect(s.questions).toHaveLength(1);
    expect(s.selection).toHaveLength(1);
    expect(s.streaming).toBe(true);
  });

  it("waits when Next is pressed before the next question arrives, then shows it", () => {
    let s = reducer(stream(), { type: "QUESTION_RECEIVED", question });
    s = reducer(s, { type: "ANSWER", choice: "Right" });
    s = reducer(s, { type: "NEXT" });
    expect(s.waiting).toBe(true);
    expect(s.questionIndex).toBe(0);
    s = reducer(s, { type: "QUESTION_RECEIVED", question: q2 });
    expect(s.waiting).toBe(false);
    expect(s.questionIndex).toBe(1);
    expect(s.isDisabled).toBe(false);
  });

  it("ends the roll when the stream finishes while waiting", () => {
    let s = reducer(stream(), { type: "QUESTION_RECEIVED", question });
    s = reducer(s, { type: "ANSWER", choice: "Right" });
    s = reducer(s, { type: "NEXT" });
    s = reducer(s, { type: "STREAM_DONE" });
    expect(s.phase).toBe("gameover");
    expect(s.score).toBe(1);
  });

  it("fails the roll if the stream ends with no questions", () => {
    const s = reducer(stream(), { type: "STREAM_DONE" });
    expect(s.phase).toBe("error");
  });

  it("ignores questions that arrive after the player left", () => {
    const s = reducer(initialState, { type: "QUESTION_RECEIVED", question });
    expect(s.phase).toBe("select");
    expect(s.questions).toHaveLength(0);
  });
});
