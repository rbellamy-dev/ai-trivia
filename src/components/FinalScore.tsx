"use client";

import TriviaButton from "./TriviaButton";
import ScoreChip from "./ScoreChip";
import { MiniCard } from "./CardPiles";
import { useScoreHistory } from "@/hooks/useScoreHistory";

// The score names a poker hand. Five bands, so every result reads as a real
// hand rather than one catch-all for everything under 70%.
const HANDS: { min: number; name: string; talk: string }[] = [
  { min: 100, name: "Royal Flush", talk: "Every trick taken. The table is yours." },
  { min: 80, name: "Full House", talk: "A strong hand. The house is already folding." },
  { min: 60, name: "Straight", talk: "More hits than misses. A solid run." },
  { min: 40, name: "Two Pair", talk: "Half the table. Another deal and you're ahead." },
  { min: 0, name: "High Card", talk: "A rough deal. Reshuffle and go again." },
];

const handFor = (pct: number) => HANDS.find((h) => pct >= h.min) ?? HANDS[HANDS.length - 1];

// useScoreHistory stores dates as M/D/YYYY; show them as "Sep 28".
const shortDate = (mdy: string) => {
  const [m, d, y] = mdy.split("/").map(Number);
  const date = new Date(y, m - 1, d);
  return Number.isNaN(date.getTime())
    ? mdy
    : date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
};

const FinalScore = ({
  onPlayAgain,
  onNewSubject,
  score,
  questions,
  deck = "",
  results = [],
}: {
  onPlayAgain: () => void;
  onNewSubject: () => void;
  score: number;
  questions: number;
  /** The deck just played, named on the replay button. */
  deck?: string;
  /** Per-question outcome, in play order. Falls back to score-first if missing. */
  results?: (boolean | null)[];
}) => {
  const hand = handFor((score / questions) * 100);
  const best = useScoreHistory(score, questions);

  const played: (boolean | null)[] =
    results.length === questions
      ? results
      : Array.from({ length: questions }, (_, i) => i < score);

  return (
    <section
      key={score}
      className="flex flex-col items-center text-center animate-fade-in"
    >
      {/* The chip carries the score; the hand name is the headline. */}
      <ScoreChip score={score} size="lg" label={`Chips won, out of ${questions}`} />

      <h2 className="mt-5 font-display text-[44px] uppercase leading-none tracking-[0.04em] text-sun max-sm:text-[36px]">
        {hand.name}
      </h2>
      <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.14em] text-card/80">
        {score} of {questions} tricks
      </p>
      <p className="mt-3 max-w-[42ch] text-card/80">{hand.talk}</p>

      <ul
        className="mt-7 flex flex-wrap justify-center gap-1"
        aria-label={`Hands played: ${score} hits, ${questions - score} misses`}
      >
        {played.map((ok, i) => (
          <li key={i} style={{ animationDelay: `${i * 0.05}s` }} className="animate-deal">
            <MiniCard ok={ok} size="md" />
            <span className="sr-only">
              Hand {i + 1}: {ok ? "hit" : "miss"}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.12em] text-card/80">
        Best hand{" "}
        <span className="text-sun">
          {best.score}/{best.questions}
        </span>{" "}
        · {shortDate(best.date)}
      </p>

      <div className="mt-8 flex items-center justify-center gap-3 max-[460px]:flex-col max-[460px]:items-stretch">
        <TriviaButton
          handleButton={onPlayAgain}
          buttonText={deck ? `Deal ${deck} again` : "Deal again"}
        />
        <TriviaButton
          handleButton={onNewSubject}
          buttonText="Pick another deck"
          variant="quiet"
        />
      </div>
    </section>
  );
};

export default FinalScore;
