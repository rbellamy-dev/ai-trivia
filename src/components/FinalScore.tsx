"use client";

import { useEffect, useRef, useState } from "react";
import TriviaButton from "./TriviaButton";
import { Check, Cross } from "./Marks";
import { useScoreHistory } from "@/hooks/useScoreHistory";
import type { Question } from "@/data/types";
import type { PrintImage } from "@/hooks/useRollImages";

// The result names how the roll came out. Five bands, so every result reads
// as a real verdict rather than one catch-all for everything under 70%.
const BANDS: { min: number; name: string; talk: string }[] = [
  { min: 100, name: "Gallery show", talk: "Every one a keeper. Hang the whole set." },
  { min: 80, name: "Portfolio", talk: "Strong work. Most of these go on the wall." },
  { min: 60, name: "Keepers", talk: "More right than wrong. A solid shoot." },
  { min: 40, name: "Test strip", talk: "Half the prints came out. Another go and you're there." },
  { min: 0, name: "Overexposed", talk: "A rough round. Load fresh film and go again." },
];

const bandFor = (pct: number) => BANDS.find((b) => pct >= b.min) ?? BANDS[BANDS.length - 1];

// useScoreHistory stores dates as M/D/YYYY; show them as "Sep 28".
const shortDate = (mdy: string) => {
  const [m, d, y] = mdy.split("/").map(Number);
  const date = new Date(y, m - 1, d);
  return Number.isNaN(date.getTime())
    ? mdy
    : date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
};

/**
 * One print on the contact sheet. It turns over (hover, focus or tap) to show
 * its question and the answer, so the sheet stays a clean grid of photos but
 * still lets you learn from the ones you missed.
 */
const SheetPrint = ({
  question,
  image,
  choice,
  index,
}: {
  question: Question;
  image?: PrintImage;
  choice: string;
  index: number;
}) => {
  const [turned, setTurned] = useState(false);
  const ok = question.answer.includes(choice);
  const answer = question.answer[0];

  return (
    <li style={{ animationDelay: `${index * 0.05}s` }} className="animate-fade-in">
      <button
        type="button"
        aria-pressed={turned}
        aria-label={`Question ${index + 1}, ${ok ? "correct" : "incorrect"}. ${question.question} Answer: ${answer}.${
          ok ? "" : ` You said ${choice || "nothing"}.`
        }`}
        onClick={() => setTurned((t) => !t)}
        className="group block w-full cursor-pointer transition-transform duration-200 [perspective:900px] hover:-translate-y-0.5"
      >
        <span
          className={`relative block aspect-[3/4] transition-transform duration-500 ease-out [transform-style:preserve-3d] motion-reduce:transition-none ${
            turned ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          {/* front: the print */}
          <span className="absolute inset-0 bg-print p-1.5 shadow-thumb [backface-visibility:hidden]">
            <span className="relative block size-full overflow-hidden bg-empty">
              {image?.status === "ready" ? (
                // eslint-disable-next-line @next/next/no-img-element -- a pre-sized 320px WebP thumbnail
                <img src={question.photo?.thumb ?? image.url} alt="" loading="lazy" decoding="async" className="size-full object-cover" />
              ) : (
                <span className="grid size-full place-items-center p-2 text-center font-hand text-[0.875rem]">
                  {question.caption}
                </span>
              )}
              <span aria-hidden="true" className={`absolute inset-0 ${ok ? "bg-hit/25" : "bg-pencil-text/30"}`} />
              {ok ? (
                <Check still className="absolute top-[30%] left-[30%] size-[40%]" />
              ) : (
                <Cross still className="absolute top-[30%] left-[30%] size-[40%]" />
              )}
            </span>
          </span>

          {/* back: the question, as if written on the reverse of the print */}
          <span
            aria-hidden="true"
            className="absolute inset-0 flex flex-col gap-2 overflow-hidden bg-print p-3 text-left shadow-thumb [backface-visibility:hidden] [transform:rotateY(180deg)]"
          >
            <span className="font-mono text-[0.75rem] text-muted">{String(index + 1).padStart(2, "0")}</span>
            <span className="line-clamp-5 text-[0.8125rem] leading-snug text-ink">{question.question}</span>
            <span className="mt-auto text-[0.8125rem] leading-snug font-medium text-hit">{answer}</span>
            {!ok && (
              <span className="text-[0.75rem] leading-snug text-pencil-text line-through decoration-1">
                {choice}
              </span>
            )}
          </span>
        </span>
      </button>
    </li>
  );
};

/** The end of the round: every print laid out as a contact sheet. */
const FinalScore = ({
  onPlayAgain,
  onNewSubject,
  score,
  questions,
  images,
  choices,
  deck = "",
}: {
  onPlayAgain: () => void;
  onNewSubject: () => void;
  score: number;
  questions: Question[];
  images: PrintImage[];
  /** What the player picked for each question, in play order. */
  choices: string[];
  deck?: string;
}) => {
  const total = questions.length;
  const band = bandFor((score / total) * 100);
  const best = useScoreHistory(score, total, deck || undefined);

  // The Next button that led here just unmounted; land focus on the verdict.
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => headingRef.current?.focus({ preventScroll: true }), []);

  return (
    <section className="mx-auto flex w-full max-w-[920px] flex-col items-center px-6 pb-10 text-center animate-fade-in max-sm:px-4">
      <p className="text-[0.875rem] text-muted">Contact sheet{deck ? ` · ${deck}` : ""}</p>
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="mt-2 text-[2.5rem] leading-none font-semibold tracking-[-0.02em] outline-none md:text-[3.25rem]"
      >
        {band.name}
      </h2>
      <p className="mt-4 text-[1rem] text-muted">
        <b className="font-semibold text-ink">{score}</b> of {total} correct
      </p>
      <p className="mt-1 max-w-[46ch] text-[1.0625rem] text-muted">{band.talk}</p>

      <ol
        aria-label={`Your round: ${score} correct, ${total - score} incorrect`}
        className="mt-8 grid w-full grid-cols-2 gap-2.5 bg-strip p-4 sm:grid-cols-3 sm:gap-3 md:grid-cols-5"
      >
        {questions.map((q, i) => (
          <SheetPrint key={q.id} question={q} image={images[i]} choice={choices[i] ?? ""} index={i} />
        ))}
      </ol>
      <p className="mt-3 text-[0.8125rem] text-muted">Tap or click a print to turn it over.</p>

      <p className="mt-6 text-[0.875rem] text-muted">
        Best score <span className="font-mono text-ink tabular-nums">{best.score}/{best.questions}</span>
        <span aria-hidden="true"> · </span>
        {shortDate(best.date)}
      </p>

      <div className="mt-8 flex items-center justify-center gap-3 max-[460px]:w-full max-[460px]:flex-col max-[460px]:items-stretch">
        <TriviaButton
          handleButton={onPlayAgain}
          buttonText={deck ? `Play ${deck} again` : "Play again"}
        />
        <TriviaButton handleButton={onNewSubject} buttonText="Choose another topic" variant="quiet" />
      </div>
    </section>
  );
};

export default FinalScore;
