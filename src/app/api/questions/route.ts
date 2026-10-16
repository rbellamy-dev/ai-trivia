import { openai } from "@ai-sdk/openai";
import { Output, streamText } from "ai";
import { questionSchemaFor } from "@/data/questionSchema";
import { scenesFor } from "@/data/photoQueries";
import { isPlayable } from "@/data/questionChecks";
import { pickScene } from "@/data/scenePicker";
import type { Scene } from "@/data/scenes";
import type { Question } from "@/data/types";

// Run on the Node.js runtime (Fluid Compute). Do NOT switch to edge.
export const maxDuration = 60;

const ROLL_SIZE = 10;

const NEUTRAL_CAPTIONS = ["Field notes", "Late light", "From the archive", "Study", "Untitled", "Kept"];
const neutralCaption = (i: number) => NEUTRAL_CAPTIONS[i % NEUTRAL_CAPTIONS.length];
// The quality checks drop a question now and then, so ask for a couple of
// spares and stop as soon as ROLL_SIZE good ones have been sent.
const ASK_FOR = ROLL_SIZE + 2;

/** A shuffled copy, so the model doesn't just walk the library top to bottom. */
const shuffled = <T,>(items: T[]) => {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const promptFor = (category: string, scenes: Scene[]) => `Generate ${ASK_FOR} trivia questions in the "${category}" category. Each question is shown with a photo chosen from a fixed library.

Rules:
- Aim for questions a curious adult gets right about 60% of the time: mostly medium, a few easy, one or two harder. Nothing obscure.
- Skip the famous first-thing-anyone-knows facts for the topic (who built the pyramids, what July 4th celebrates, the capital of France). Ask about the second thing people know.
- Never put the answer, or a distinctive word from it, in the question.
- Each question has exactly 4 answer choices, all different. Exactly one is correct.
- The wrong choices are the same kind of thing as the answer (all emperors, all countries, all years) and plausible enough to make someone think.
- The "answer" array must contain exactly one string that matches one of the "choices" entries verbatim (same spelling, casing, and punctuation).
- Keep questions factual, unambiguous, and family-friendly.
- Do not repeat questions.

The photo:
- The photo only sets the scene for the question's topic. It must NOT show or hint at the correct answer or any of the choices. Example: for "Which emperor opened the Colosseum?" a photo of stone columns is fine; for "Which bird can turn its head almost all the way round?" never the owl photo.
- Before choosing, ask: "Could someone answer from this photo alone?" If yes, choose a more oblique one.
- Captions are 1–3 neutral words, like a note on the back of a print ("Field notes", "Late light", "From the archive", "Study"). Never use numbers or dates in a caption. A caption never names or hints at a country, city, culture, person or anything in the choices. Bad: "Famous French Landmark". Good: "Late light".

The photo library ("imageQuery" must be one of these names, copied exactly; what each photo shows is after the colon):
${shuffled(scenes).map((s) => `- ${s.name}: ${s.description}`).join("\n")}

Choosing the photo:
- Read the whole list, then pick the photo whose subject is closest to what the question is about (a cell question gets a lab or microscope photo; a digestion question gets something about food or the body, not a jellyfish). Do not just take photos in list order.
- Use a different photo for every question.`;

/**
 * Streams the roll as NDJSON: one `{"question": …}` line per question as soon
 * as it's written, validated and paired with its photo, then `{"done": true}`.
 * A failure after the stream starts sends `{"error": …}` so the client can
 * end the round with what it already has.
 */
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
    return Response.json({ error: "The server is missing OPENAI_API_KEY." }, { status: 500 });
  }

  const scenes = scenesFor(category);
  // Stops generation when the player leaves, or once the round is full.
  const generation = new AbortController();
  request.signal.addEventListener("abort", () => generation.abort());
  const { elementStream } = streamText({
    model: openai("gpt-4o-mini"),
    output: Output.array({ element: questionSchemaFor(scenes.map((s) => s.name) as [string, ...string[]]) }),
    prompt: promptFor(category, scenes),
    abortSignal: generation.signal,
  });

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    // The work runs in the background; each line is sent as soon as it's queued.
    start(controller) {
      void pump(controller);
    },
  });

  async function pump(controller: ReadableStreamDefaultController<Uint8Array>) {
    const send = (line: object) => controller.enqueue(encoder.encode(JSON.stringify(line) + "\n"));
    const seen = new Set<string>();
    const usedScenes = new Set<string>();
    let sent = 0;

    try {
      for await (const q of elementStream) {
        const key = q.question.trim().toLowerCase();
        if (seen.has(key) || !isPlayable(q)) {
          console.warn("Dropped a question:", q.question);
          continue;
        }
        seen.add(key);

        // The model's scene, unless it's already in this roll or would hint
        // at the answer; then another scene from the same roll.
        const scene = pickScene(q.imageQuery, q.answer[0], scenes, usedScenes);
        if (scene) usedScenes.add(scene.name);

        // Captions with numbers clash with the print's frame number (a "Frame
        // 3" on 04A) and can hint at year answers, so they get a neutral one.
        const caption = /\d/.test(q.caption) || !q.caption.trim() ? neutralCaption(sent) : q.caption.trim();

        const question: Question = {
          id: `question-${sent}`,
          question: q.question,
          choices: q.choices,
          answer: q.answer,
          caption,
          imageAlt: scene?.description ?? "",
          photo: scene ? { url: scene.src, thumb: scene.thumb, alt: scene.description } : null,
        };
        send({ question });
        if (++sent >= ROLL_SIZE) break;
      }
      send({ done: true });
      // Round is full: don't pay for the spares nobody will see.
      generation.abort();
    } catch (error) {
      if (!generation.signal.aborted) {
        console.error("Failed while streaming trivia questions:", error);
        send({ error: "Failed to generate questions. Please try again." });
      }
    } finally {
      try {
        controller.close();
      } catch {
        // Already closed because the client went away.
      }
    }
  }

  return new Response(stream, {
    headers: { "Content-Type": "application/x-ndjson; charset=utf-8", "Cache-Control": "no-store" },
  });
}
