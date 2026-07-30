export type MedalTier = "gold" | "silver" | "bronze";

const TIER = {
  gold: { core: "var(--color-stargold)", halo: "var(--color-ember)", label: "Gold constellation medal" },
  silver: { core: "var(--color-star-silver)", halo: "var(--color-violet)", label: "Silver constellation medal" },
  bronze: { core: "var(--color-star-bronze)", halo: "var(--color-fog)", label: "Bronze constellation medal" },
} as const;

/**
 * The finale medal: a small asterism of connected stars inside a haloed ring,
 * echoing the game's core idea that the score is an almanac of stars. Tinted by tier.
 */
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
      {/* halo */}
      <circle cx="85" cy="85" r="70" stroke={halo} strokeOpacity="0.3" strokeDasharray="2 6" />
      <circle cx="85" cy="85" r="52" stroke={halo} strokeOpacity="0.45" strokeWidth="1" />

      {/* the asterism */}
      <path
        d="M60 58 L92 44 L118 72 L96 106 L62 96 L60 58 M92 44 L96 106"
        stroke={core}
        strokeOpacity="0.55"
        strokeWidth="1"
      />
      <circle cx="60" cy="58" r="3" fill={core} />
      <circle cx="118" cy="72" r="3.5" fill={core} />
      <circle cx="96" cy="106" r="3" fill={core} />
      <circle cx="62" cy="96" r="2.5" fill={core} />
      <circle
        cx="92"
        cy="44"
        r="5"
        fill={core}
        style={{ filter: `drop-shadow(0 0 6px ${core})` }}
      />

      {/* faint field stars */}
      <circle cx="38" cy="112" r="1.5" fill="var(--color-starlight)" opacity="0.5" />
      <circle cx="132" cy="46" r="1.5" fill="var(--color-starlight)" opacity="0.5" />
      <circle cx="126" cy="120" r="1.5" fill="var(--color-starlight)" opacity="0.4" />
    </svg>
  );
};

export default StarMedal;
