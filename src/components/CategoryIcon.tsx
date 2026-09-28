import type { CategoryIconName } from "@/data/categories";

/**
 * Each category is a suit. Clubs and spades are black, diamonds and hearts
 * are red, as on a real deck. The Joker is the wild fifth card: a mixed deck. The data layer still names icons (flask, column,
 * globe, note); this is the only place that maps those names to suits.
 */
export const SUITS: Record<
  CategoryIconName,
  { glyph: string; name: string; red: boolean }
> = {
  flask: { glyph: "♣", name: "clubs", red: false },
  column: { glyph: "♦", name: "diamonds", red: true },
  globe: { glyph: "♥", name: "hearts", red: true },
  note: { glyph: "♠", name: "spades", red: false },
  joker: { glyph: "★", name: "wild card", red: false },
};

const CategoryIcon = ({
  name,
  className = "",
}: {
  name: CategoryIconName;
  className?: string;
}) => {
  const suit = SUITS[name];
  return (
    <span
      aria-hidden="true"
      className={`${name === "joker" ? "text-sun" : suit.red ? "text-coral-ink" : "text-ink"} ${className}`}
    >
      {suit.glyph}
    </span>
  );
};

export default CategoryIcon;
