/**
 * The two piles that flank the question card. Together they are the progress
 * bar: the draw pile shrinks as hands are dealt, the played pile fills with
 * mint (hit) and coral (miss) mini-cards.
 */

const PILE = "relative mx-auto aspect-[5/7] w-full max-w-24 max-sm:hidden short:hidden";
const LABEL =
  "absolute inset-x-0 -bottom-5 whitespace-nowrap text-center text-[10px] font-bold uppercase tracking-[0.12em] text-card";

export const DrawPile = ({ remaining }: { remaining: number }) => {
  const backs = Math.min(3, Math.max(remaining, 0));
  const offsets = ["-translate-x-1 -translate-y-1", "-translate-x-0.5 -translate-y-0.5", ""];

  return (
    <div
      className={PILE}
      role="img"
      aria-label={`Draw pile: ${remaining} ${remaining === 1 ? "card" : "cards"} to draw`}
    >
      {backs === 0 ? (
        <span className="absolute inset-0 rounded-lg border-[1.5px] border-dashed border-card/40" />
      ) : (
        offsets.slice(3 - backs).map((offset, i) => (
          <span
            key={i}
            className={`card-back absolute inset-0 rounded-lg border-[1.5px] shadow-[0_2px_0_rgb(23_19_16/0.4)] ${offset}`}
          />
        ))
      )}
      <small className={LABEL} aria-hidden="true">
        draw
      </small>
    </div>
  );
};

export const PlayedPile = ({ results }: { results: (boolean | null)[] }) => {
  const played = results.filter((r): r is boolean => r !== null);
  const hits = played.filter(Boolean).length;
  const misses = played.length - hits;

  return (
    <div
      className={PILE}
      role="img"
      aria-label={`Played pile: ${hits} ${hits === 1 ? "hit" : "hits"}, ${misses} ${misses === 1 ? "miss" : "misses"}`}
    >
      <span className="absolute inset-0 rounded-lg border-[1.5px] border-ink bg-card shadow-[0_2px_0_rgb(23_19_16/0.4)]" />
      <span className="absolute inset-2 flex flex-wrap content-center justify-center gap-[3px] max-sm:inset-1.5 max-sm:gap-0.5">
        {played.map((ok, i) => (
          <MiniCard key={i} ok={ok} />
        ))}
      </span>
      <small className={LABEL} aria-hidden="true">
        played
      </small>
    </div>
  );
};

/**
 * Phones and short screens: the two piles fold into one slim row of ten
 * mini-cards (played in colour, the current one outlined, the rest blank).
 */
export const ProgressStrip = ({
  results,
  current,
}: {
  results: (boolean | null)[];
  current: number;
}) => {
  const hits = results.filter((r) => r === true).length;
  const misses = results.filter((r) => r === false).length;
  return (
    <div
      role="img"
      aria-label={`Hands: ${hits} ${hits === 1 ? "hit" : "hits"}, ${misses} ${misses === 1 ? "miss" : "misses"}`}
      className="col-span-full mt-3 hidden justify-center gap-1.5 max-sm:flex short:hidden!"
    >
      {results.map((r, i) => (
        <span
          key={i}
          className={`h-[22px] w-4 rounded-[2px] border border-ink ${
            r === null ? "bg-blank opacity-50" : r ? "bg-mint" : "bg-coral"
          } ${i === current && r === null ? "opacity-100 outline-2 outline-offset-1 outline-sun" : ""}`}
        />
      ))}
    </div>
  );
};

/** One played question as a tiny card: mint for a hit, coral for a miss. */
export const MiniCard = ({
  ok,
  size = "sm",
}: {
  ok: boolean | null;
  size?: "sm" | "md";
}) => (
  <span
    className={`block rounded-[2px] border border-ink animate-deal ${
      size === "sm" ? "h-[22px] w-4" : "h-9 w-[26px] rounded-[3px]"
    } ${ok === null ? "bg-blank opacity-50" : ok ? "bg-mint" : "bg-coral"}`}
  />
);
