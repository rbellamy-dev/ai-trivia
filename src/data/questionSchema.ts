import { z } from "zod";
import { photoQueriesFor } from "./photoQueries";

/**
 * The schema for one question. `photoQueries` is the roll's scene names from
 * the print library; the model must pick one, so every question gets a photo.
 */
export const questionSchemaFor = (photoQueries: [string, ...string[]]) =>
  z
    .object({
      question: z.string().describe("The trivia question prompt."),
      choices: z.array(z.string()).length(4).describe("Exactly four answer options."),
      answer: z
        .array(z.string())
        .length(1)
        .describe("A one-element array holding the correct choice, verbatim."),
      caption: z
        .string()
        .describe(
          "A 2-4 word handwritten caption for the photo print, like a place or era. Never names or hints at the answer."
        ),
      imageQuery: z
        .enum(photoQueries)
        .describe("The photo, chosen by name from the library, that best sets the scene."),
    })
    // The prompt asks for a verbatim match, but only this check guarantees it:
    // an answer that isn't one of the choices makes the question unwinnable.
    .refine((q) => q.choices.includes(q.answer[0]), {
      message: "The answer must match one of the choices exactly.",
    });

/** The schema with every search allowed (any roll). */
export const questionSchema = questionSchemaFor(photoQueriesFor(""));

export type GeneratedQuestion = z.infer<typeof questionSchema>;
