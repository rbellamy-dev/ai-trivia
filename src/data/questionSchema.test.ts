import { describe, expect, it } from "vitest";
import { questionSchema } from "./questionSchema";

const base = {
  question: "Which emperor opened the Colosseum?",
  choices: ["Titus", "Nero", "Augustus", "Caligula"],
  answer: ["Titus"],
  caption: "Case 07",
  imageQuery: "ancient ruins",
};

describe("question schema", () => {
  it("accepts a well-formed question", () => {
    expect(questionSchema.safeParse(base).success).toBe(true);
  });

  it("rejects an answer that isn't one of the choices", () => {
    expect(questionSchema.safeParse({ ...base, answer: ["Emperor Titus"] }).success).toBe(false);
  });

  it("rejects a photo search that isn't on the roll's list", () => {
    expect(questionSchema.safeParse({ ...base, imageQuery: "the colosseum" }).success).toBe(false);
  });

  it("rejects a question without exactly four choices", () => {
    expect(questionSchema.safeParse({ ...base, choices: ["Titus", "Nero"] }).success).toBe(false);
  });
});
