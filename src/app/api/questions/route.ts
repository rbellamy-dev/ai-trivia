import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

// Run on the Node.js runtime (Fluid Compute). Do NOT switch to edge.
export const maxDuration = 60;

const questionSchema = z.object({
  question: z.string().describe("The trivia question prompt."),
  choices: z
    .array(z.string())
    .length(4)
    .describe("Exactly four answer options."),
  answer: z
    .array(z.string())
    .length(1)
    .describe("A one-element array holding the correct choice, verbatim."),
});

const responseSchema = z.object({
  questions: z.array(questionSchema).length(10),
});

export async function POST(request: Request) {
  let category: string;
  try {
    const body = await request.json();
    category = typeof body?.category === "string" ? body.category.trim() : "";
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!category) {
    return Response.json({ error: "A category is required." }, { status: 400 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return Response.json(
      { error: "The server is missing an OpenAI API key." },
      { status: 500 }
    );
  }

  try {
    const { object } = await generateObject({
      model: openai("gpt-4o-mini"),
      schema: responseSchema,
      prompt: `Generate 10 trivia questions in the "${category}" category.

Rules:
- Difficulty must range from easy to medium (nothing hard or obscure).
- Vary the difficulty across the set so it does not feel repetitive.
- Each question must have exactly 4 answer choices.
- Exactly one choice is correct.
- The "answer" array must contain exactly one string that matches one of the "choices" entries verbatim (same spelling, casing, and punctuation).
- Keep questions factual, unambiguous, and family-friendly.
- Do not repeat questions.`,
    });

    const questions = object.questions.map((q, i) => ({
      id: `question-${i}`,
      question: q.question,
      choices: q.choices,
      answer: q.answer,
    }));

    return Response.json({ questions });
  } catch (error) {
    console.error("Failed to generate trivia questions:", error);
    return Response.json(
      { error: "Failed to generate questions. Please try again." },
      { status: 500 }
    );
  }
}
