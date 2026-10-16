"use client";

import { useCallback, useState } from "react";

export type Settings = {
  /** A–D / 1–4 answer while focus is inside the game. */
  shortcuts: boolean;
};

const STORAGE_KEY = "snapshot-settings";
const DEFAULTS: Settings = { shortcuts: true };

const readSettings = (): Settings => {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return {
      shortcuts: typeof raw?.shortcuts === "boolean" ? raw.shortcuts : DEFAULTS.shortcuts,
    };
  } catch {
    return DEFAULTS;
  }
};

/**
 * Player settings, remembered per browser. Nothing on the first (select)
 * screen depends on them, so reading storage during the first render
 * can't cause a hydration mismatch.
 */
export function useSettings() {
  const [settings, setSettings] = useState<Settings>(() =>
    typeof window === "undefined" ? DEFAULTS : readSettings()
  );

  const update = useCallback((patch: Partial<Settings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Storage can be blocked (private mode); the setting still applies this session.
      }
      return next;
    });
  }, []);

  return [settings, update] as const;
}
