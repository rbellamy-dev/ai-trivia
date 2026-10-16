import type { Question } from "@/data/types";
import type { PrintImage } from "@/hooks/useRollImages";
import { Check, Cross } from "./Marks";

/**
 * The round's progress as a strip of film. Answered frames show their print with
 * a grease-pencil check or cross; frames ahead stay blank (no peeking at
 * what's coming) and hatch while their image is still generating.
 */
const FilmStrip = ({
  questions,
  images,
  results,
  current,
  total,
}: {
  questions: Question[];
  images: PrintImage[];
  results: (boolean | null)[];
  current: number;
  /** Frames to show; more than `questions` while the roll is still being written. */
  total: number;
}) => (
  <ol
    aria-label="Round progress"
    className="sprockets relative grid grid-cols-10 gap-2 bg-strip px-6 py-4 max-sm:gap-1.5 max-sm:px-3"
  >
    {questions.map((q, i) => {
      const img = images[i];
      const result = results[i] ?? null;
      const played = result !== null;
      const isCurrent = i === current;
      const state = played
        ? result
          ? "correct"
          : "incorrect"
        : isCurrent
          ? "current"
          : "not answered yet";

      // Only frames already played, or the one on the table, show their print.
      const showPrint = (played || isCurrent) && img?.status === "ready";

      return (
        <li
          key={q.id}
          aria-label={`Question ${i + 1}, ${state}`}
          aria-current={isCurrent ? "step" : undefined}
          className={`relative aspect-[4/3] overflow-hidden bg-empty ${
            isCurrent ? "z-10 shadow-[0_0_0_2px_var(--color-strip),0_0_0_4px_var(--color-ink)]" : ""
          } ${!showPrint && img?.status === "loading" ? "hatched animate-pulse-soft" : ""}`}
        >
          {showPrint && (
            // eslint-disable-next-line @next/next/no-img-element -- a pre-sized 320px WebP thumbnail
            <img
              src={q.photo?.thumb ?? img.url}
              alt=""
              loading="lazy"
              decoding="async"
              className={`size-full object-cover transition-[filter] duration-700 ${
                played ? "brightness-80 saturate-75" : "blur-[2px] grayscale-[35%]"
              }`}
            />
          )}
          {!showPrint && (
            <span
              aria-hidden="true"
              className="absolute inset-0 grid place-items-center font-mono text-[0.75rem] text-empty-text max-sm:text-[0.625rem]"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
          )}
          {played && (
            <>
              <span
                aria-hidden="true"
                className={`absolute inset-0 ${result ? "bg-hit/40" : "bg-pencil-text/45"}`}
              />
              {/* Only the frame just answered draws its mark live. */}
              {result ? (
                <Check still={!isCurrent} delay={isCurrent ? 0.9 : 0} className="absolute top-[14%] left-[14%] size-[72%]" />
              ) : (
                <Cross still={!isCurrent} delay={isCurrent ? 0.9 : 0} className="absolute top-[14%] left-[14%] size-[72%]" />
              )}
            </>
          )}
        </li>
      );
    })}
    {/* Questions not written yet: blank, developing frames. */}
    {Array.from({ length: Math.max(0, total - questions.length) }, (_, k) => {
      const i = questions.length + k;
      return (
        <li
          key={`pending-${i}`}
          aria-label={`Question ${i + 1}, not written yet`}
          className="hatched relative aspect-[4/3] animate-pulse-soft"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 grid place-items-center font-mono text-[0.75rem] text-empty-text max-sm:text-[0.625rem]"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
        </li>
      );
    })}
  </ol>
);

export default FilmStrip;
