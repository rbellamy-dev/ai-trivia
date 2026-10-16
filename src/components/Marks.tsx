import type { CSSProperties } from "react";

// Hand-drawn grease-pencil marks. Each shape has pathLength="1", so the
// .mark CSS draws any of them with the same dash-offset animation.
// `still` renders the mark already drawn (frames answered earlier).

type MarkProps = {
  className?: string;
  still?: boolean;
  delay?: number;
  duration?: number;
};

const style = (delay = 0, duration?: number) =>
  ({
    "--draw-delay": `${delay}s`,
    ...(duration ? { "--draw-duration": `${duration}s` } : {}),
  }) as CSSProperties;

const cls = (base: string, still?: boolean, className = "") =>
  `mark ${still ? "mark-static" : ""} ${base} ${className}`;

/**
 * A full grease-pencil loop around the right answer. A closed ellipse sized in
 * percentages, so it fits any answer box with an even stroke and the draw
 * always closes the loop. A slight tilt keeps it hand-drawn.
 */
export const Ring = ({ className, still, delay = 0.3, duration = 0.6 }: MarkProps) => (
  <svg
    aria-hidden="true"
    className={cls("pointer-events-none absolute -rotate-2 overflow-visible stroke-hit", still, className)}
    style={style(delay, duration)}
  >
    <ellipse cx="50%" cy="50%" rx="49%" ry="45%" pathLength={1} strokeWidth={3} />
  </svg>
);

/** A quick strike through a wrong pick. */
export const Strike = ({ className, still, delay = 0, duration = 0.3 }: MarkProps) => (
  <svg
    aria-hidden="true"
    className={cls("pointer-events-none absolute overflow-visible stroke-pencil", still, className)}
    style={style(delay, duration)}
  >
    <line x1="0%" y1="60%" x2="100%" y2="40%" pathLength={1} strokeWidth={3} />
  </svg>
);

/** A check on a kept frame. */
export const Check = ({ className, still, delay = 0 }: MarkProps) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 40 40"
    className={cls("pointer-events-none overflow-visible stroke-white", still, className)}
    style={style(delay, 0.35)}
  >
    <path pathLength={1} strokeWidth={3} d="M8,21 L16,30 L33,9" />
  </svg>
);

/** A cross on a missed frame. */
export const Cross = ({ className, still, delay = 0 }: MarkProps) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 40 40"
    className={cls("pointer-events-none overflow-visible stroke-white", still, className)}
    style={style(delay, 0.35)}
  >
    <path pathLength={1} strokeWidth={3} d="M10,10 L30,30 M30,9 L10,31" />
  </svg>
);
