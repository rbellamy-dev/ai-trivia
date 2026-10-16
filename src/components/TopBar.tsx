"use client";

import { useEffect, useRef, useState } from "react";
import type { Settings } from "@/hooks/useSettings";

const Switch = ({
  checked,
  label,
  hint,
  onChange,
}: {
  checked: boolean;
  label: string;
  hint: string;
  onChange: (v: boolean) => void;
}) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className="flex w-full cursor-pointer items-start gap-3 rounded-lg p-2 text-left hover:bg-table"
  >
    <span
      aria-hidden="true"
      className={`relative mt-0.5 h-5 w-9 shrink-0 rounded-full transition-colors ${
        checked ? "bg-ink" : "bg-line"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 size-4 rounded-full bg-card transition-transform ${
          checked ? "translate-x-4" : ""
        }`}
      />
    </span>
    <span>
      <span className="block text-[0.9375rem] font-medium">{label}</span>
      <span className="block text-[0.8125rem] leading-snug text-muted">{hint}</span>
    </span>
  </button>
);

const textButton =
  "min-h-11 cursor-pointer rounded-full px-3 text-[0.875rem] text-muted hover:text-ink";

const TopBar = ({
  category,
  question,
  total,
  correct,
  settings,
  onSettings,
  onLeave,
}: {
  category: string;
  question: number;
  total: number;
  correct: number;
  settings: Settings;
  onSettings: (patch: Partial<Settings>) => void;
  onLeave: () => void;
}) => {
  // Leaving throws the round away, so it asks first, inline (no modal).
  const [confirming, setConfirming] = useState(false);
  const leaveRef = useRef<HTMLButtonElement>(null);
  const stayRef = useRef<HTMLButtonElement>(null);
  const wasConfirming = useRef(false);

  // Escape anywhere in the round asks to leave (unless a popover handled it).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || e.defaultPrevented || confirming) return;
      if (document.querySelector(":popover-open")) return;
      setConfirming(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [confirming]);

  useEffect(() => {
    if (confirming) stayRef.current?.focus();
    else if (wasConfirming.current) leaveRef.current?.focus();
    wasConfirming.current = confirming;
  }, [confirming]);

  return (
    <header className="flex flex-wrap items-center gap-x-6 gap-y-1 px-6 py-4 max-sm:px-4 short:py-2">
      <span className="flex items-center gap-2 text-[1.1875rem] font-semibold tracking-[-0.01em]">
        Snapshot
        <span className="font-normal text-muted">Trivia</span>
        <span aria-hidden="true" className="size-2.5 rounded-full bg-pencil" />
      </span>
      <span className="text-[0.875rem] text-muted max-md:hidden">{category}</span>

      <span className="ml-auto text-[0.875rem] text-muted">
        Question <span className="font-mono text-ink tabular-nums">{question}</span> of {total}
        <span aria-hidden="true"> · </span>
        <b className="font-medium text-ink">
          <span key={correct} className={`inline-block tabular-nums ${correct > 0 ? "animate-bump" : ""}`}>
            {correct}
          </span>{" "}
          correct
        </b>
      </span>

      {confirming ? (
        <span
          role="group"
          aria-label="Leave this round?"
          className="flex items-center gap-1 text-[0.875rem]"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              e.preventDefault();
              setConfirming(false);
            }
          }}
        >
          <span className="mr-1 text-ink">Leave this round?</span>
          <button
            type="button"
            onClick={onLeave}
            className={`${textButton} text-pencil-text hover:text-pencil-text hover:underline`}
          >
            Leave
          </button>
          <button ref={stayRef} type="button" onClick={() => setConfirming(false)} className={textButton}>
            Keep playing
          </button>
        </span>
      ) : (
        <span className="flex items-center gap-1">
          <button type="button" popoverTarget="snapshot-options" className={textButton}>
            Options
          </button>
          <button ref={leaveRef} type="button" onClick={() => setConfirming(true)} className={textButton}>
            Leave round
          </button>
        </span>
      )}

      <div
        id="snapshot-options"
        popover="auto"
        aria-label="Options"
        className="options-popover w-[300px] rounded-xl border border-line bg-card p-2 text-ink shadow-popover"
      >
        <Switch
          checked={settings.shortcuts}
          label="Letter shortcuts"
          hint="Press A–D or 1–4 to answer, Enter for the next question."
          onChange={(shortcuts) => onSettings({ shortcuts })}
        />
      </div>
    </header>
  );
};

export default TopBar;
