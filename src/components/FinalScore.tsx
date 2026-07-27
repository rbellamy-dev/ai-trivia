"use client";

import TriviaButton from "./TriviaButton";
import StarMedal, { type MedalTier } from "./StarMedal";
import { useScoreHistory } from "@/hooks/useScoreHistory";

const getTier = (pct: number): MedalTier =>
  pct >= 90 ? "gold" : pct >= 70 ? "silver" : "bronze";

const TITLES: Record<MedalTier, string> = {
  gold: "Supernova",
  silver: "Rising Star",
  bronze: "Stardust",
};

const TOASTS: Record<MedalTier, string> = {
  gold: "The whole sky is yours tonight. Navigators will steer by this one.",
  silver: "A bright constellation. Two more stars and it becomes legend.",
  bronze: "Every constellation began as scattered dust. Chart another sky.",
};

const FinalScore = ({
  onPlayAgain,
  onNewSubject,
  score,
  questions,
}: {
  onPlayAgain: () => void;
  onNewSubject: () => void;
  score: number;
  questions: number;
}) => {
  const percentage = (score / questions) * 100;
  const tier = getTier(percentage);
  const best = useScoreHistory(score, questions);

  return (
    <section
      key={score}
      className="flex flex-col items-center text-center animate-fade-in"
    >
      <StarMedal tier={tier} />

      <h2 className="mt-2 font-display text-[36px] font-medium uppercase tracking-[0.06em] text-stargold max-[520px]:text-[28px]">
        {TITLES[tier]}
      </h2>
      <p className="mt-2 max-w-[46ch] text-fog">{TOASTS[tier]}</p>

      <div className="mt-6">
        <span className="font-display text-[58px] font-bold leading-none text-starlight [text-shadow:0_0_40px_rgb(110_231_216_/_0.35)] max-[720px]:text-[44px]">
          {score}
        </span>
        <span className="mt-1 block text-[10.5px] font-normal uppercase tracking-[0.4em] text-fog">
          stars lit of {questions}
        </span>
      </div>

      <p className="mt-5 text-[11px] uppercase tracking-[0.3em] text-fog">
        Brightest chart:{" "}
        <span className="text-stargold">
          {best.score} of {best.questions}
        </span>{" "}
        on {best.date}
      </p>

      <div className="mt-8 flex items-center justify-center gap-3 max-[460px]:flex-col max-[460px]:items-stretch">
        <TriviaButton handleButton={onPlayAgain} buttonText="Play again" />
        <TriviaButton
          handleButton={onNewSubject}
          buttonText="New subject"
          variant="quiet"
        />
      </div>
    </section>
  );
};

export default FinalScore;
