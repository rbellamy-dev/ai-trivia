"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";

export type Score = {
  date: string;
  score: number;
  questions: number;
  /** The roll it was played on. Older saved games don't have it. */
  roll?: string;
};

const STORAGE_KEY = "scores";

const formatDate = (d = new Date()) =>
  `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;

const parseScores = (raw: string | null): Score[] => {
  try {
    const list = JSON.parse(raw || "[]");
    return Array.isArray(list)
      ? list.filter((s): s is Score => typeof s?.score === "number")
      : [];
  } catch {
    return [];
  }
};

const readScores = (): Score[] => {
  try {
    return parseScores(localStorage.getItem(STORAGE_KEY));
  } catch {
    return [];
  }
};

const bestOf = (scores: Score[]) =>
  scores.reduce<Score | undefined>((max, s) => (max && max.score >= s.score ? max : s), undefined);

/**
 * Records the just-finished game once and returns the best score so far on
 * this roll. "Best so far" is taken from prior games, falling back to the
 * current game on a first play.
 */
export function useScoreHistory(score: number, questions: number, roll?: string): Score {
  const current: Score = { date: formatDate(), score, questions, roll };

  // Derived once at mount from what was already stored (excludes this game).
  const [best] = useState<Score>(() => {
    const prior = readScores().filter((s) => !roll || s.roll === roll);
    return bestOf(prior) ?? current;
  });

  // The one real side effect: persist this game exactly once.
  const saved = useRef(false);
  useEffect(() => {
    if (saved.current) return;
    saved.current = true;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...readScores(), current]));
    } catch {
      // Storage blocked: the score just isn't remembered.
    }
    // `current` is stable for this mount; intentionally run-once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return best;
}

// Browser storage as an external store. The snapshot is the raw string (a
// stable primitive); the server snapshot is null, so nothing renders until
// after hydration and there's no mismatch.
const subscribe = (onChange: () => void) => {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
};
const getSnapshot = () => {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

/** The best saved score for each roll, keyed by roll name. */
export function useBestByRoll(): Record<string, Score> {
  const raw = useSyncExternalStore(subscribe, getSnapshot, () => null);
  return useMemo(() => {
    const best: Record<string, Score> = {};
    for (const s of parseScores(raw)) {
      if (s.roll && (!best[s.roll] || s.score > best[s.roll].score)) best[s.roll] = s;
    }
    return best;
  }, [raw]);
}
