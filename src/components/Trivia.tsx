"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ROLL_SIZE, useTrivia, type State } from "@/hooks/useTrivia";
import { useSettings } from "@/hooks/useSettings";
import { useRollImages } from "@/hooks/useRollImages";
import { topicFor } from "@/data/categories";
import type { Question } from "@/data/types";
import TopBar from "./TopBar";
import FilmStrip from "./FilmStrip";
import Frame from "./Frame";
import TriviaButton from "./TriviaButton";
import FinalScore from "./FinalScore";
import CategorySelect from "./CategorySelect";

// One shared empty roll, so image loading doesn't re-run outside of play.
const NO_QUESTIONS: Question[] = [];

// The round in progress, kept for this tab so a refresh resumes it.
const SAVE_KEY = "snapshot-round";

// Questions stream in, so this only covers writing the first one. It says
// how long that takes, says so again if it runs long, and offers a way out.
const LoadingRoll = ({ category, onCancel }: { category: string; onCancel: () => void }) => {
  const [slow, setSlow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setSlow(true), 8000);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="mx-auto flex w-full max-w-[720px] flex-col items-center gap-8 px-6 py-16 text-center animate-fade-in">
      <div aria-hidden="true" className="sprockets relative grid w-full grid-cols-10 gap-2 bg-strip px-6 py-4">
        {Array.from({ length: 10 }, (_, i) => (
          <span
            key={i}
            className="hatched aspect-[4/3] animate-pulse-soft"
            style={{ animationDelay: `${i * 0.12}s` }}
          />
        ))}
      </div>
      <div role="status">
        <p className="text-[1.0625rem] font-medium text-ink">
          Writing your first {category ? `${category} ` : ""}question…
        </p>
        <p className="mt-1.5 text-[0.9375rem] text-muted">
          {slow ? "Still writing. Almost there." : "This usually takes a few seconds."}
        </p>
      </div>
      <TriviaButton handleButton={onCancel} buttonText="Choose another topic" variant="quiet" />
    </div>
  );
};

const Trivia = () => {
  const { state, selectCategory, answer, next, reset, restore, isCurrentCorrect } = useTrivia();
  const { phase, questions, questionIndex, score, selection, showMessage, isDisabled, streaming, waiting } =
    state;
  const [settings, updateSettings] = useSettings();

  // Remember the picked roll so the top bar can name it and the contact sheet
  // can replay it directly.
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

  // Resume a round after a refresh. This reads browser storage, which the
  // server render can't, so it has to happen after mount.
  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(SAVE_KEY) || "null") as {
        state?: State;
        category?: string;
      } | null;
      if (saved?.state?.phase === "playing" && saved.state.questions?.length) {
        restore(saved.state);
        // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from browser storage on mount
        setCategory(saved.category ?? "");
      }
    } catch {
      // Storage blocked or corrupt: start fresh.
    } finally {
      delete document.documentElement.dataset.resuming;
    }
  }, [restore]);

  // Keep the saved round current; drop it once the round ends or is left.
  useEffect(() => {
    try {
      if (phase === "playing") sessionStorage.setItem(SAVE_KEY, JSON.stringify({ state, category }));
      else if (phase !== "loading") sessionStorage.removeItem(SAVE_KEY);
    } catch {
      // Storage blocked: the round just won't survive a refresh.
    }
  }, [state, category, phase]);

  const isPlaying = phase === "playing" && questions.length > 0;
  const hasRoll = (phase === "playing" || phase === "gameover") && questions.length > 0;
  const images = useRollImages(hasRoll ? questions : NO_QUESTIONS);
  const currentChoice = selection[questionIndex]?.choice ?? "";
  // While questions are still streaming in, the roll's length isn't final.
  const isLast = !streaming && questions.length - 1 === questionIndex;
  const total = streaming ? Math.max(ROLL_SIZE, questions.length) : questions.length;
  // No photos at all (shouldn't happen with the local library): say so once.
  const noPhotos = isPlaying && questions.every((q) => !q.photo);

  // Per-question results for the strip: correct / incorrect / not yet.
  const results = useMemo(
    () =>
      selection.map((s, i) =>
        s.choice ? (questions[i]?.answer.includes(s.choice) ?? false) : null
      ),
    [selection, questions]
  );

  // The reducer clears the selection when the last question is played, so
  // keep a copy of the answers for the contact sheet.
  // (Adjusted during render rather than in an effect, per React's guidance.)
  const [played, setPlayed] = useState(selection);
  if (phase === "playing" && played !== selection) setPlayed(selection);

  return (
    <main
      className={`min-h-dvh leading-normal ${
        isPlaying
          ? "grid grid-rows-[auto_auto_1fr] [grid-template-areas:'top'_'strip'_'frame'] md:grid-rows-[auto_1fr_auto] md:[grid-template-areas:'top'_'frame'_'strip']"
          : `flex flex-col items-center justify-center pt-10 ${phase === "gameover" ? "" : "pb-10"}`
      }`}
    >
      {phase !== "select" && <h1 className="sr-only">Snapshot Trivia</h1>}

      {phase === "select" && (
        <div className="w-full px-6 max-sm:px-4">
          <h1 className="mb-10 flex items-center justify-center gap-2 text-[1.375rem] font-semibold tracking-[-0.01em]">
            Snapshot
            <span className="font-normal text-muted">Trivia</span>
            <span aria-hidden="true" className="size-3 rounded-full bg-pencil" />
          </h1>
          <CategorySelect onSelect={handleSelectCategory} />
        </div>
      )}

      {phase === "loading" && <LoadingRoll category={category} onCancel={reset} />}

      {phase === "error" && (
        <div className="mx-auto flex max-w-[460px] flex-col items-center gap-5 bg-print px-8 py-10 text-center shadow-print animate-rise">
          <p className="font-hand text-[1.875rem] leading-tight text-pencil-text">
            This round didn&apos;t develop
          </p>
          {/* The server's message is for developers (it can name a missing
              API key), so players get plain language and two ways forward. */}
          <p role="alert" className="max-w-md text-[1rem] text-muted">
            Something went wrong while writing the {category ? `${category} ` : ""}questions.
            Try again, or choose another topic.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <TriviaButton handleButton={playAgain} buttonText="Try again" />
            <TriviaButton handleButton={reset} buttonText="Choose another topic" variant="quiet" />
          </div>
        </div>
      )}

      {isPlaying && (
        <>
          <div className="[grid-area:top]">
            <TopBar
              category={category}
              question={questionIndex + 1}
              total={total}
              correct={score}
              settings={settings}
              onSettings={updateSettings}
              onLeave={reset}
            />
            {noPhotos && (
              <p role="status" className="px-6 text-[0.875rem] text-muted max-sm:px-4">
                Photos are unavailable right now, so this round plays with captions.
              </p>
            )}
          </div>
          <div className="self-center [grid-area:frame]">
            <div className="mx-auto w-full max-w-[1120px]">
              <Frame
                key={questions[questionIndex].id}
                question={questions[questionIndex]}
                index={questionIndex}
                image={images[questionIndex]}
                settings={settings}
                isDisabled={isDisabled}
                showMessage={showMessage}
                currentChoice={currentChoice}
                isCorrect={isCurrentCorrect}
                isLast={isLast}
                waiting={waiting}
                onAnswer={answer}
                onNext={next}
              />
            </div>
          </div>
          <div className="[grid-area:strip]">
            <FilmStrip
              questions={questions}
              images={images}
              results={results}
              current={questionIndex}
              total={total}
            />
          </div>
        </>
      )}

      {phase === "gameover" && (
        <FinalScore
          questions={questions}
          images={images}
          score={score}
          choices={played.map((s) => s.choice)}
          deck={category}
          onPlayAgain={playAgain}
          onNewSubject={reset}
        />
      )}
    </main>
  );
};

export default Trivia;
