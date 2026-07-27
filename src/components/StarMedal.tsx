export type MedalTier = "gold" | "silver" | "bronze";

const TIER = {
  gold: { core: "var(--color-stargold)", halo: "var(--color-teal)", label: "Gold star" },
  silver: { core: "var(--color-star-silver)", halo: "var(--color-violet)", label: "Silver star" },
  bronze: { core: "var(--color-star-bronze)", halo: "var(--color-fog)", label: "Bronze star" },
} as const;

/** The finale medal — a haloed four-point star, tinted by tier. */
const StarMedal = ({ tier }: { tier: MedalTier }) => {
  const { core, halo, label } = TIER[tier];
  return (
    <svg
      viewBox="0 0 170 170"
      fill="none"
      role="img"
      aria-label={label}
      className="mx-auto w-[170px] animate-drift-in"
    >
      <circle
        cx="85"
        cy="85"
        r="70"
        stroke={halo}
        strokeOpacity="0.3"
        strokeDasharray="2 6"
      />
      <circle cx="85" cy="85" r="52" stroke={halo} strokeOpacity="0.5" strokeWidth="1" />
      <path
        d="M85 30l10 40 40 15-40 15-10 40-10-40-40-15 40-15 10-40Z"
        fill={core}
        opacity="0.95"
      />
      <path
        d="M85 30l10 40 40 15-40 15-10 40-10-40-40-15 40-15 10-40Z"
        fill="none"
        stroke="var(--color-starlight)"
        strokeOpacity="0.6"
      />
      <circle cx="85" cy="85" r="8" fill="var(--color-starlight)" />
      <circle cx="30" cy="40" r="2" fill={halo} />
      <circle cx="140" cy="50" r="2.5" fill={core} />
      <circle cx="145" cy="125" r="2" fill={halo} />
      <circle cx="35" cy="130" r="2.5" fill={core} />
    </svg>
  );
};

export default StarMedal;
