"use client";

import Image, { type StaticImageData } from "next/image";
import { categories } from "@/data/categories";
import { useBestByRoll } from "@/hooks/useScoreHistory";
// Roll covers generated once with Nano Banana 2 (see DESIGN.md §7).
import science from "@/assets/rolls/science.jpg";
import history from "@/assets/rolls/history.jpg";
import geography from "@/assets/rolls/geography.jpg";
import biology from "@/assets/rolls/biology.jpg";

// Each roll's cover print.
const COVERS: Record<string, StaticImageData> = { science, history, geography, biology };

// Four rolls laid on the light table, each a small print. On phones they
// form a 2×2 grid.
const TILT = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];

const CategorySelect = ({
  onSelect,
}: {
  onSelect: (category: string) => void;
}) => {
  const bestByRoll = useBestByRoll();
  // animate-rise, not fade-in: this section holds the LCP heading, so it must
  // be contentful at frame zero (transform-only entrance).
  return (
    <section className="flex flex-col items-center text-center animate-rise">
      <h2 className="text-[2.25rem] font-semibold leading-tight tracking-[-0.02em] md:text-[3rem]">
        Pick a topic
      </h2>
      <p className="mt-3 max-w-[46ch] text-[1.0625rem] leading-relaxed text-muted">
        Ten questions, each with its own photo. See every photo marked right
        or wrong at the end.
      </p>

      <ul className="mt-10 grid w-full max-w-[760px] grid-cols-4 gap-5 max-md:grid-cols-2">
        {categories.map((category, i) => {
          const cover = COVERS[category.id];
          const best = bestByRoll[category.name];
          return (
            <li key={category.id}>
              <button
                type="button"
                onClick={() => onSelect(category.name)}
                style={{ animationDelay: `${0.05 + i * 0.07}s` }}
                className={`group flex h-full w-full cursor-pointer flex-col bg-print p-2.5 pb-4 text-left shadow-card transition-transform duration-200 animate-rise hover:-translate-y-1 hover:rotate-0 max-md:rotate-0 ${TILT[i]}`}
              >
                <span aria-hidden="true" className="relative block aspect-[4/3] w-full overflow-hidden bg-empty">
                  {cover && (
                    <Image
                      src={cover}
                      alt=""
                      fill
                      placeholder="blur"
                      // Above the fold on the first screen: load right away.
                      priority
                      sizes="(max-width: 768px) 48vw, 180px"
                      className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                    />
                  )}
                </span>
                <span className="mt-3 block px-1 text-[1rem] font-medium leading-tight">
                  {category.name}
                </span>
                {/* Your best on this roll, once you've played it. The line
                    keeps its height so the cards stay aligned. */}
                <span className="mt-1 block min-h-[1.25rem] px-1 text-[0.8125rem] text-muted">
                  {best && (
                    <>
                      Best <span className="font-mono text-ink tabular-nums">{best.score}/{best.questions}</span>
                    </>
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default CategorySelect;
