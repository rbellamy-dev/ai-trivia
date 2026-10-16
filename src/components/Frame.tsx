"use client";

import { useEffect, useRef } from "react";
import type { Question } from "@/data/types";
import type { PrintImage } from "@/hooks/useRollImages";
import type { Settings } from "@/hooks/useSettings";
import Print from "./Print";
import TriviaAnswers from "./TriviaAnswers";
import TriviaButton from "./TriviaButton";

/**
 * One frame of the roll: the print, the question, and its answers. It's keyed
 * by question, so it remounts (and moves focus) for every new frame.
 */
const Frame = ({
  question,
  index,
  image,
  settings,
  isDisabled,
  showMessage,
  currentChoice,
  isCorrect,
  isLast,
  waiting,
  onAnswer,
  onNext,
}: {
  question: Question;
  index: number;
  image: PrintImage;
  settings: Settings;
  isDisabled: boolean;
  showMessage: boolean;
  currentChoice: string;
  isCorrect: boolean;
  isLast: boolean;
  /** Next was pressed before the next question finished writing. */
  waiting: boolean;
  onAnswer: (choice: string) => void;
  onNext: () => void;
}) => {
  const answered = Boolean(currentChoice);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  // Focus moves to the new question, so keyboard and screen reader users
  // start each frame at the top instead of on a button that just unmounted.
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, []);

  // After answering, focus moves forward to Next.
  useEffect(() => {
    if (answered) nextRef.current?.focus({ preventScroll: true });
  }, [answered]);

  // Keyboard accelerators, anywhere on the page during a round: A–D or 1–4
  // answers, Enter goes to the next question. Single-key shortcuts are
  // allowed because they can be switched off in Options (WCAG 2.1.4).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.defaultPrevented || e.repeat) return;
      const target = e.target as HTMLElement;
      // Not while the Options panel (or any text field) has the keyboard.
      if (target.closest("[popover], input, textarea, select, [contenteditable]")) return;
      if (!answered) {
        if (!settings.shortcuts) return;
        const i = "abcd".indexOf(e.key.toLowerCase());
        const n = "1234".indexOf(e.key);
        const pick = i >= 0 ? i : n;
        if (pick >= 0 && question.choices[pick]) {
          e.preventDefault();
          onAnswer(question.choices[pick]);
        }
        return;
      }
      // A focused live button already handles Enter itself; don't advance twice.
      const liveButton =
        target.tagName === "BUTTON" && target.getAttribute("aria-disabled") !== "true";
      if (e.key === "Enter" && !liveButton) {
        e.preventDefault();
        onNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [answered, settings.shortcuts, question.choices, onAnswer, onNext]);

  return (
    <div className="grid items-center gap-x-14 gap-y-6 px-6 py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] max-sm:px-4 max-sm:py-4 short:grid-cols-[auto_1fr] short:gap-x-6 short:py-2">
      <Print
        image={image}
        caption={question.caption}
        frame={index + 1}
        alt={question.imageAlt}
      />

      <div className="flex min-w-0 flex-col gap-4">
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="text-[1.5rem] leading-[1.15] font-semibold tracking-[-0.015em] outline-none md:text-[2rem]"
        >
          {question.question}
        </h2>

        <TriviaAnswers
          isDisabled={isDisabled}
          onAnswer={onAnswer}
          currentAnswer={currentChoice}
          answerChoices={question.choices}
          correctAnswers={question.answer}
        />

        <div className="flex min-h-11 flex-wrap items-center justify-between gap-3">
          <p aria-live="polite" className="text-[0.9375rem]">
            {showMessage && (
              <span key={currentChoice} className="inline-block animate-rise">
                {!currentChoice ? (
                  "Pick an answer first."
                ) : isCorrect ? (
                  <span className="font-medium text-hit">Correct.</span>
                ) : (
                  <span className="text-pencil-text">
                    Not quite. The answer is <b className="font-semibold">{question.answer[0]}</b>.
                  </span>
                )}
              </span>
            )}
            {!showMessage && settings.shortcuts && (
              <span className="text-muted max-sm:hidden">Press A–D or 1–4 to answer, Enter to continue, Esc to leave.</span>
            )}
          </p>
          {answered && (
            // While the next question is still being written the button
            // stays put (so focus does too) and says what's happening.
            <span className="animate-rise">
              <TriviaButton
                ref={nextRef}
                handleButton={onNext}
                busy={waiting}
                buttonText={waiting ? "Writing the next question" : isLast ? "See your results" : "Next question →"}
              />
            </span>
          )}
          <span role="status" className="sr-only">
            {waiting ? "Writing the next question." : ""}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Frame;
