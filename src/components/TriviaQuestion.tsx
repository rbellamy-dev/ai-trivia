const STAMP = {
  hit: "border-mint-ink text-mint-ink",
  miss: "border-coral-ink text-coral-ink",
} as const;

/**
 * The question as the top card of a slightly rotated stack: corner index and
 * suit, the question set in Anton, the category label, and a rubber stamp
 * (HIT / MISS) that slams down once the hand is played.
 */
const TriviaQuestion = ({
  currentQuestion,
  questions,
  questionIndex,
  score,
  category = "",
  suit = "",
  suitRed = false,
  stamp = null,
}: {
  currentQuestion: string;
  questions: number;
  questionIndex: number;
  score: number;
  category?: string;
  suit?: string;
  suitRed?: boolean;
  stamp?: "hit" | "miss" | null;
}) => {
  const corner = String(questionIndex).padStart(2, "0");

  return (
    <section
      key={questionIndex}
      className="relative mx-auto w-full max-w-[440px] animate-deal short:max-w-[620px]"
      aria-label={`Question ${questionIndex} of ${questions}, score ${score}`}
    >
      {/* the cards underneath */}
      <span
        aria-hidden="true"
        className="absolute inset-0 -translate-x-2.5 translate-y-2 -rotate-[5deg] rounded-[14px] border-2 border-ink bg-card opacity-70 shadow-[0_6px_0_rgb(23_19_16/0.35)]"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 translate-x-2 translate-y-1 rotate-[3deg] rounded-[14px] border-2 border-ink bg-card opacity-85 shadow-[0_6px_0_rgb(23_19_16/0.35)]"
      />

      {/* the top card */}
      <div className="relative flex min-h-[270px] -rotate-1 flex-col gap-3 rounded-[14px] border-2 border-ink bg-card px-[22px] py-[18px] text-ink shadow-[0_6px_0_rgb(23_19_16/0.35)] max-sm:min-h-[190px] max-sm:px-4 max-sm:py-3.5 short:min-h-0 short:gap-1 short:py-2.5">
        <div
          aria-hidden="true"
          className="flex justify-between font-display text-[22px] tracking-[0.03em]"
        >
          <span>{corner}</span>
          <span className={`text-[26px] leading-none ${suitRed ? "text-coral-ink" : "text-ink"}`}>
            {suit}
          </span>
        </div>

        <h2 className="my-auto font-display text-[clamp(20px,3vw,28px)] short:text-xl uppercase leading-[1.1] tracking-[0.01em]">
          {currentQuestion}
        </h2>

        <div className="flex items-end justify-between text-[11px] font-bold uppercase tracking-[0.14em] opacity-60 short:hidden">
          <span>{category}</span>
        </div>

        {stamp && (
          <span
            key={stamp}
            aria-hidden="true"
            className={`absolute top-3 left-1/2 -translate-x-1/2 rounded-md border-4 px-3 py-0.5 font-display text-3xl tracking-[0.06em] animate-stamp max-sm:top-2.5 max-sm:border-[3px] max-sm:text-2xl short:top-1 short:right-12 short:left-auto short:translate-x-0 short:border-2 short:px-2 short:text-base ${STAMP[stamp]}`}
          >
            {stamp === "hit" ? "HIT" : "MISS"}
          </span>
        )}
      </div>
    </section>
  );
};

export default TriviaQuestion;
