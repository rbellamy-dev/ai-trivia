"use client";

import { useEffect, useRef, useState } from "react";

export type Score = {
  date: string;
  score: number;
  questions: number;
};

const STORAGE_KEY = "scores";

const formatDate = (d = new Date()) =>
  `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;

const readScores = (): Score[] => {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(raw)
      ? raw.filter((s): s is Score => typeof s?.score === "number")
      : [];
  } catch {
    return [];
  }
};

/**
 * Records the just-finished game once and returns the best score so far.
 * "Best so far" is taken from prior games, falling back to the current game
 * on a first-ever play.
 */
export function useScoreHistory(score: number, questions: number): Score {
  const current: Score = { date: formatDate(), score, questions };

  // Derived once at mount from what was already stored (excludes this game).
  const [best] = useState<Score>(() => {
    const prior = readScores();
    if (prior.length === 0) return current;
    return prior.reduce((max, s) => (max.score >= s.score ? max : s));
  });

  // The one real side effect: persist this game exactly once.
  const saved = useRef(false);
  useEffect(() => {
    if (saved.current) return;
    saved.current = true;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([...readScores(), current])
    );
    // `current` is stable for this mount; intentionally run-once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return best;
}
