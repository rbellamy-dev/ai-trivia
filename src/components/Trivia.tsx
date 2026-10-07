"use client";

import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useTrivia } from "@/hooks/useTrivia";
import { categories, topicFor } from "@/data/categories";
import FeltTable from "./FeltTable";
import { DrawPile, PlayedPile, ProgressStrip } from "./CardPiles";
import ScoreChip from "./ScoreChip";
import TriviaButton from "./TriviaButton";
import FinalScore from "./FinalScore";
import TriviaQuestion from "./TriviaQuestion";
import TriviaAnswers from "./TriviaAnswers";
import CategorySelect from "./CategorySelect";
import { SUITS } from "./CategoryIcon";

// One shared empty hand, so the keyboard effect doesn't re-run on every
// render outside of play.
const NO_CHOICES: string[] = [];

// AI decks can take a few seconds. After a short wait the loader says so,
// so a slow deal never looks like a hang.
const Shuffling = () => {
  const [slow, setSlow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setSlow(true), 5000);
    return () => clearTimeout(t);
  }, []);
  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center gap-8 py-16 text-center animate-fade-in"
    >
      <div aria-hidden="true" className="relative h-[98px] w-[96px]">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="card-back absolute inset-x-3 inset-y-0 rounded-lg border-[1.5px] shadow-[0_2px_0_rgb(23_19_16/0.4)] animate-shuffle"
            style={{ animationDelay: `${i * -0.53}s` }}
          />
        ))}
      </div>
      <div>
        <p className="font-display text-sm uppercase tracking-[0.14em] text-sun">
          Shuffling the deck…
        </p>
        <p className={`mt-2 text-sm text-card/80 ${slow ? "animate-rise" : "invisible"}`}>
          Fresh questions take a few seconds to write.
        </p>
      </div>
    </div>
  );
};

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

  // Remember the picked deck so the top bar can name it and the finale can
  // reshuffle it directly.
  const [category, setCategory] = useState("");
  const handleSelectCategory = useCallback(
    (name: string) => {
      setCategory(name);
      selectCategory(topicFor(name));
    },
    [selectCategory]
  );
  const playAgain = useCallback(
    () => selectCategory(topicFor(category)),
    [selectCategory, category]
  );
  const suit = SUITS[categories.find((c) => c.name === category)?.icon ?? "note"];

  const currentChoice = selection[questionIndex]?.choice ?? "";
  const isPlaying = phase === "playing" && questions.length > 0;
  const isLast = questions.length - 1 === questionIndex;

  // Per-question results for the piles: hit / miss / not-yet.
  const results = useMemo(
    () =>
      selection.map((s, i) =>
        s.choice ? questions[i]?.answer.includes(s.choice) ?? false : null
      ),
    [selection, questions]
  );

  // The reducer clears the selection when the last hand is played, so keep a
  // copy of the play-order results for the finale's row of played cards.
  // (Adjusted during render rather than in an effect, per React's guidance.)
  const [played, setPlayed] = useState(results);
  if (phase === "playing" && played !== results) setPlayed(results);

  const stamp = isDisabled && currentChoice ? (isCurrentCorrect ? "hit" : "miss") : null;
  const answered = Boolean(currentChoice);
  const choices = isPlaying ? questions[questionIndex].choices : NO_CHOICES;

  // Keyboard accelerators: A-D or 1-4 plays a card, Enter deals the next hand.
  useEffect(() => {
    if (!isPlaying) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement;
      if (!answered) {
        const i = "abcd".indexOf(e.key.toLowerCase());
        const n = "1234".indexOf(e.key);
        const pick = i >= 0 ? i : n;
        if (pick >= 0 && choices[pick]) {
          e.preventDefault();
          answer(choices[pick]);
        }
        return;
      }
      // A focused live button already handles Enter itself; don't deal twice.
      const liveButton =
        target.tagName === "BUTTON" && target.getAttribute("aria-disabled") !== "true";
      if (e.key === "Enter" && !liveButton) {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isPlaying, answered, choices, answer, next]);

  return (
    <>
      <FeltTable />
      <main className="relative z-10 mx-auto flex min-h-full w-full max-w-[860px] flex-col items-center justify-center py-6 leading-normal short:py-1">
        {isPlaying && <h1 className="sr-only">Card Table</h1>}
        {!isPlaying && (
          <header className="mb-9 text-center animate-rise">
            <h1 className="font-display text-lg uppercase tracking-[0.3em] text-sun [text-indent:0.3em]">
              Card Table
            </h1>
            <p className="mt-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-card/80">
              Ten hands · one chip per trick
            </p>
          </header>
        )}

        <section className="w-full">
          {phase === "select" && (
            <CategorySelect onSelect={handleSelectCategory} />
          )}

          {phase === "loading" && <Shuffling />}

          {phase === "error" && (
            <div className="mx-auto flex max-w-[440px] flex-col items-center gap-5 rounded-[14px] border-2 border-ink bg-card px-6 py-8 text-center text-ink shadow-[0_6px_0_rgb(23_19_16/0.35)] animate-deal">
              <p className="font-display text-[28px] uppercase tracking-[0.04em] text-coral-ink">
                Misdeal
              </p>
              {/* The server's message is for developers (it can name a missing
                  API key), so players get table talk and two ways forward. */}
              <p role="alert" className="max-w-md">
                The dealer dropped the {category || "deck"} deck. Check your
                connection and deal again, or pick another deck.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <TriviaButton handleButton={playAgain} buttonText="Deal again" />
                <TriviaButton
                  handleButton={reset}
                  buttonText="Pick another deck"
                  variant="ink"
                />
              </div>
            </div>
          )}

          {isPlaying && (
            <div className="grid grid-cols-[minmax(0,1fr)] grid-rows-[auto_1fr_auto]">
              {/* top bar */}
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-5 py-3.5 short:py-1 text-xs font-bold uppercase tracking-[0.1em] text-card max-sm:px-2">
                <span>
                  {category} · Hand {questionIndex + 1} of {questions.length}
                </span>
                <span className="ml-auto flex items-center gap-3">
                  <button
                    type="button"
                    onClick={reset}
                    className="min-h-11 cursor-pointer rounded-full px-3 font-bold uppercase tracking-[0.1em] text-card/80 underline-offset-4 transition-colors hover:text-card hover:underline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-sun"
                  >
                    Fold
                  </button>
                  <ScoreChip score={score} />
                </span>
              </div>

              {/* the table: draw pile | question card | played pile.
                  On phones and short screens the piles fold into a slim
                  progress strip under the question. */}
              <div className="grid grid-cols-[110px_minmax(0,1fr)_110px] items-center gap-3 px-5 pt-1.5 pb-8 max-sm:grid-cols-1 max-sm:gap-y-4 max-sm:px-2 max-sm:pb-2 short:grid-cols-1 short:gap-y-2 short:pb-1">
                <DrawPile remaining={questions.length - questionIndex - 1} />
                <div className="min-w-0">
                <TriviaQuestion
                  currentQuestion={questions[questionIndex].question}
                  questionIndex={questionIndex + 1}
                  questions={questions.length}
                  score={score}
                  category={category}
                  suit={suit.glyph}
                  suitRed={suit.red}
                  stamp={stamp}
                />
                </div>
                <PlayedPile results={results} />
                <ProgressStrip results={results} current={questionIndex} />
              </div>

              {/* the hand */}
              <div className="relative px-5 pt-6 pb-5 max-sm:px-2 max-sm:pt-2 short:pt-2 short:pb-1">
                <p
                  aria-live="polite"
                  className="min-h-[18px] text-center font-display text-sm uppercase tracking-[0.14em] text-sun"
                >
                  {showMessage && (
                    <span key={currentChoice} className="inline-block animate-rise">
                      {!currentChoice
                        ? "Play a card first."
                        : isCurrentCorrect
                        ? "Hit. Take the trick."
                        : "Miss. The ringed card was the play."}
                    </span>
                  )}
                </p>

                <TriviaAnswers
                  handleAnswer={handleAnswer}
                  isDisabled={isDisabled}
                  currentAnswer={currentChoice}
                  answerChoices={questions[questionIndex].choices}
                  correctAnswers={questions[questionIndex].answer}
                  questionIndex={questionIndex}
                  suit={suit.glyph}
                  suitRed={suit.red}
                />

                {/* Deal next only appears once a card is played, so it can't be
                    pressed by mistake. It keeps its space to avoid a jump. */}
                <div className="mt-3 flex items-center justify-between gap-4 max-sm:mt-4 short:absolute short:-top-1 short:right-0 short:mt-0!">
                  <p className="text-xs text-card/80 max-sm:hidden short:hidden">
                    Keys: A–D to play, Enter to deal
                  </p>
                  <div className={`ml-auto ${answered ? "animate-rise" : "invisible"}`}>
                    <TriviaButton
                      handleButton={next}
                      buttonText={isLast ? "Show my hand" : "Deal next"}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {phase === "gameover" && (
            <FinalScore
              questions={questions.length}
              score={score}
              results={played}
              deck={category}
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
