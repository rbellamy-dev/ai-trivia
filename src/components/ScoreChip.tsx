const SIZES = {
  sm: "h-11 w-11 border-[3px] text-lg",
  lg: "h-[88px] w-[88px] border-4 text-[34px]",
} as const;

/**
 * The score as a poker chip: a yellow disc with a dashed ink ring and a gold
 * drop edge. Pops (scale) whenever the value changes.
 */
const ScoreChip = ({
  score,
  size = "sm",
  label = "Score",
}: {
  score: number;
  size?: keyof typeof SIZES;
  label?: string;
}) => (
  <span
    key={score}
    role="img"
    aria-label={`${label}: ${score}`}
    className={`inline-grid shrink-0 place-items-center rounded-full border-dashed border-ink bg-sun font-display tracking-[0.02em] text-ink shadow-[0_3px_0_var(--color-sun-edge)] animate-pop ${SIZES[size]}`}
  >
    {score}
  </span>
);

export default ScoreChip;
