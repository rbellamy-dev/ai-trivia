"use client";

import { ChangeEvent, useCallback, useMemo, useRef } from "react";
import { useTrivia } from "@/hooks/useTrivia";
import NightSky from "./NightSky";
import Almanac from "./Almanac";
import TriviaButton from "./TriviaButton";
import FinalScore from "./FinalScore";
import TriviaQuestion from "./TriviaQuestion";
import TriviaAnswers from "./TriviaAnswers";
import CategorySelect from "./CategorySelect";

const Trivia = () => {
  const { state, selectCategory, answer, next, reset, isCurrentCorrect } =
    useTrivia();
  const {
    phase,
    questions,
    questionIndex,
    score,
    selection,
    showMessage,
    isDisabled,
  } = state;

  const handleAnswer = (event: ChangeEvent | null, val?: string) => {
    const choice = (event?.target as HTMLInputElement)?.value || val || "";
    answer(choice);
  };

  // Remember the last-picked category so the finale can replay it directly.
  const lastCategory = useRef("");
  const handleSelectCategory = useCallback(
    (category: string) => {
      lastCategory.current = category;
      selectCategory(category);
    },
    [selectCategory]
  );
  const playAgain = useCallback(
    () => selectCategory(lastCategory.current),
    [selectCategory]
  );

  const currentChoice = selection[questionIndex]?.choice ?? "";
  const isPlaying = phase === "playing" && questions.length > 0;
  const isLast = questions.length - 1 === questionIndex;

  // Per-question results for the almanac: correct / wrong / not-yet.
  const results = useMemo(
    () =>
      selection.map((s, i) =>
        s.choice ? questions[i]?.answer.includes(s.choice) ?? false : null
      ),
    [selection, questions]
  );

  return (
    <>
      <NightSky />
      <main className="relative z-10 mx-auto flex min-h-full w-full max-w-[860px] flex-col items-center justify-center px-6 py-11 leading-normal">
        <header className="mb-9 text-center animate-rise">
          <h1 className="font-display text-xl font-light uppercase tracking-[0.55em] text-starlight [text-indent:0.55em] max-[520px]:text-base max-[520px]:tracking-[0.3em] max-[520px]:[text-indent:0.3em]">
            Almanac
          </h1>
          <p className="mt-2 text-xs uppercase tracking-[0.3em] text-fog">
            Every answer lights a star
          </p>
        </header>

        <section className="w-full">
          {phase === "select" && (
            <CategorySelect onSelect={handleSelectCategory} />
          )}

          {phase === "loading" && (
            <div className="flex flex-col items-center justify-center gap-7 py-16 text-center animate-fade-in">
              <div className="relative h-[90px] w-[90px]">
                <span className="absolute inset-[34px] rounded-full bg-stargold shadow-[0_0_24px_var(--color-stargold)]" />
                <span className="absolute inset-0 rounded-full border border-dashed border-starlight/20 animate-orbit">
                  <span className="absolute -top-[5px] left-1/2 h-2.5 w-2.5 rounded-full bg-ember shadow-[0_0_10px_var(--color-ember)]" />
                </span>
              </div>
              <p className="font-display text-xs font-light uppercase tracking-[0.34em] text-fog">
                Charting the sky…
              </p>
            </div>
          )}

          {phase === "error" && (
            <div className="flex flex-col items-center justify-center gap-6 py-14 text-center animate-fade-in">
              <p className="max-w-md font-body text-wrong">
                {state.errorMessage || "Something went wrong."}
              </p>
              <TriviaButton handleButton={reset} buttonText="Try Again" />
            </div>
          )}

          {isPlaying && (
            <div className="flex flex-col gap-1">
              <Almanac
                count={questions.length}
                results={results}
                currentIndex={questionIndex}
              />

              <div className="mt-4">
                <TriviaQuestion
                  currentQuestion={questions[questionIndex].question}
                  questionIndex={questionIndex + 1}
                  questions={questions.length}
                  score={score}
                />
              </div>

              <TriviaAnswers
                handleAnswer={handleAnswer}
                isDisabled={isDisabled}
                currentAnswer={currentChoice}
                answerChoices={questions[questionIndex].choices}
                correctAnswers={questions[questionIndex].answer}
                questionIndex={questionIndex}
              />

              <div className="mt-8 flex min-h-14 items-center justify-between gap-4 max-[520px]:flex-col max-[520px]:items-start">
                <div aria-live="polite" className="min-h-[1.2em]">
                  {showMessage && (
                    <span
                      key={currentChoice}
                      className={`font-display text-[13px] font-light uppercase tracking-[0.22em] animate-slide-up ${
                        isCurrentCorrect ? "text-correct" : "text-wrong"
                      }`}
                    >
                      {!currentChoice
                        ? "Please choose an answer."
                        : isCurrentCorrect
                        ? "A star ignites."
                        : "Dark star. Try the next."}
                    </span>
                  )}
                </div>
                <TriviaButton
                  handleButton={next}
                  buttonText={isLast ? "Reveal the sky" : "Next star"}
                />
              </div>
            </div>
          )}

          {phase === "gameover" && (
            <FinalScore
              questions={questions.length}
              score={score}
              onPlayAgain={playAgain}
              onNewSubject={reset}
            />
          )}
        </section>
      </main>
    </>
  );
};

export default Trivia;
