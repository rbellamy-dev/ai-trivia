"use client";

import { useState } from "react";

type Node = { x: number; y: number };

const genNodes = (count: number): Node[] => {
  const span = count > 1 ? 720 / (count - 1) : 0;
  return Array.from({ length: count }, (_, k) => ({
    x: 40 + k * span,
    y: 14 + Math.random() * 36,
  }));
};

/**
 * Progress rendered as a self-drawing star chart. Each question is a star:
 * gold + glow when answered correctly, faded when missed, pulsing ember for the
 * current question, dim for the unanswered ones ahead. A line between two
 * stars lights gold once both of its endpoints have been answered.
 *
 * Node y-positions are randomized once per mount. The component only renders
 * during the (never-server-rendered) playing phase and unmounts between games,
 * so the useState initializer is hydration-safe and re-randomizes each game.
 */
const Almanac = ({
  count,
  results,
  currentIndex,
}: {
  count: number;
  results: (boolean | null)[];
  currentIndex: number;
}) => {
  const [nodes] = useState<Node[]>(() => genNodes(count));

  return (
    <div className="w-full">
      <svg
        viewBox="0 0 800 64"
        preserveAspectRatio="none"
        className="block h-16 w-full overflow-visible"
        aria-hidden="true"
      >
        {nodes.slice(0, -1).map((n, k) => {
          const next = nodes[k + 1];
          const lit = results[k] != null && results[k + 1] != null;
          return (
            <line
              key={`line-${k}`}
              x1={n.x}
              y1={n.y}
              x2={next.x}
              y2={next.y}
              className={lit ? "stroke-stargold/60" : "stroke-starlight/25"}
              strokeWidth={1}
            />
          );
        })}

        {nodes.map((n, k) => {
          const result = results[k];
          const answered = result != null;
          const isCurrent = !answered && k === currentIndex;

          let cls = "fill-starlight/20";
          let r = 3;
          if (answered && result) {
            cls =
              "fill-stargold drop-shadow-[0_0_6px_var(--color-stargold)]";
            r = 4.5;
          } else if (answered) {
            cls = "fill-fog";
          } else if (isCurrent) {
            cls =
              "fill-ember drop-shadow-[0_0_6px_var(--color-ember)] animate-star-pulse";
            r = 4;
          }

          return (
            <circle key={`node-${k}`} cx={n.x} cy={n.y} r={r} className={cls} />
          );
        })}
      </svg>
      <span className="sr-only" aria-live="polite">
        Question {Math.min(currentIndex + 1, count)} of {count}
      </span>
    </div>
  );
};

export default Almanac;
