import { categories } from "@/data/categories";
import CategoryIcon, { SUITS } from "./CategoryIcon";

// Five decks fanned face-up: four suits and the Joker. Straightened into a
// grid on phones, where the Joker spans the full width underneath.
const FAN = [
  "rotate-[-16deg] translate-y-2",
  "rotate-[-8deg]",
  "rotate-0 -translate-y-1.5",
  "rotate-[8deg]",
  "rotate-[16deg] translate-y-2",
];

const CategorySelect = ({
  onSelect,
}: {
  onSelect: (category: string) => void;
}) => {
  // animate-rise, not fade-in: this section holds the LCP heading, so it must
  // be contentful at frame zero (transform-only entrance).
  return (
    <section className="flex flex-col text-center animate-rise">
      <h2 className="m-0 font-display text-[34px] uppercase leading-tight tracking-[0.06em] text-card max-sm:text-[28px]">
        Pick a deck
      </h2>
      <p className="mx-auto mt-3 max-w-[42ch] text-card/80">
        Ten hands, one deck. Every hit takes the trick and a chip goes on the
        table. Feeling lucky? Play the Joker.
      </p>

      <div className="mt-10 flex items-end justify-center px-4 pb-3 max-sm:grid max-sm:grid-cols-2 max-sm:gap-3 max-sm:px-0">
        {categories.map((category, i) => {
          const suit = SUITS[category.icon];
          const joker = category.icon === "joker";
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onSelect(category.name)}
              style={{ animationDelay: `${0.05 + i * 0.08}s` }}
              className={`relative -mx-2.5 flex aspect-[5/7] w-[clamp(112px,17vw,150px)] origin-[50%_130%] cursor-pointer flex-col justify-between rounded-xl border-2 p-3 text-left shadow-[0_4px_0_rgb(23_19_16/0.35)] transition-transform duration-200 animate-lift hover:z-10 hover:rotate-0 hover:-translate-y-4 focus-visible:z-10 focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-sun max-sm:mx-0 max-sm:w-auto max-sm:rotate-0 max-sm:translate-y-0 max-sm:hover:translate-y-0 ${
                joker
                  ? "border-sun bg-ink text-sun max-sm:col-span-2 max-sm:aspect-auto max-sm:flex-row max-sm:items-center max-sm:justify-start max-sm:gap-4 max-sm:py-4"
                  : "border-ink bg-card text-ink"
              } ${FAN[i]}`}
              aria-label={
                joker
                  ? "Joker, a mixed deck from every topic"
                  : `${category.name}, ${suit.name}`
              }
            >
              <CategoryIcon
                name={category.icon}
                className={`text-[26px] leading-none ${joker ? "max-sm:hidden" : ""}`}
              />
              <CategoryIcon
                name={category.icon}
                className={`self-center text-[64px] leading-none max-sm:text-[52px] ${
                  joker ? "max-sm:self-auto max-sm:text-[40px]" : ""
                }`}
              />
              <span>
                <span className="block font-display text-[13px] uppercase leading-tight tracking-[0.04em]">
                  {category.name}
                </span>
                <span className="mt-1 block text-[11px] font-bold uppercase tracking-[0.2em] opacity-80">
                  {joker ? "Mixed deck" : "10 hands"}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default CategorySelect;
