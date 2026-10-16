import { describe, expect, it } from "vitest";
import { isPlayable, leaksAnswer } from "./questionChecks";

describe("leaksAnswer", () => {
  it("catches an answer written into the question", () => {
    expect(leaksAnswer("Which ocean is the Pacific Ocean part of?", "Pacific Ocean")).toBe(true);
  });

  it("catches every distinctive answer word appearing, ignoring case and punctuation", () => {
    expect(leaksAnswer("The barrier reef that is GREAT lies off which coast?", "Great Barrier Reef")).toBe(true);
  });

  it("lets a fair question through", () => {
    expect(leaksAnswer("Which emperor opened the Colosseum to the public?", "Titus")).toBe(false);
  });

  it("ignores short or common answer words", () => {
    expect(leaksAnswer("In which year did the war end?", "The Hague")).toBe(false);
  });
});

describe("isPlayable", () => {
  const base = { question: "Which emperor opened the Colosseum?", choices: ["Titus", "Nero", "Augustus", "Caligula"], answer: ["Titus"] };

  it("accepts a well-formed question", () => {
    expect(isPlayable(base)).toBe(true);
  });

  it("rejects duplicate choices", () => {
    expect(isPlayable({ ...base, choices: ["Titus", "titus", "Nero", "Augustus"] })).toBe(false);
  });

  it("rejects an answer that isn't a choice", () => {
    expect(isPlayable({ ...base, answer: ["Vespasian"] })).toBe(false);
  });
});
