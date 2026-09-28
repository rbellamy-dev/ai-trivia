import { ChangeEvent } from "react";

const LETTERS = ["A", "B", "C", "D"];

// The fan: outer cards rotate more and sit lower. Straightened on phones,
// where the hand is a 2x2 grid instead.
const FAN = [
  "rotate-[-9deg] translate-y-2.5",
  "rotate-[-3deg]",
  "rotate-[3deg]",
  "rotate-[9deg] translate-y-2.5",
];

const TriviaAnswers = ({
  isDisabled,
  handleAnswer,
  currentAnswer,
  answerChoices,
  correctAnswers,
  questionIndex,
  suit = "",
  suitRed = false,
}: {
  isDisabled: boolean;
  handleAnswer: (e: ChangeEvent | null, s?: string) => void;
  currentAnswer: string;
  answerChoices: string[];
  correctAnswers: string[];
  questionIndex: number;
  suit?: string;
  suitRed?: boolean;
}) => {
  // Buttons, not radios. Picking a card is immediate and final, so each choice
  // is an action, not a form value: one button per card, every one its own tab
  // stop, Enter/Space plays it.
  //
  // After a pick they stay focusable (aria-disabled, not disabled) so focus is
  // never yanked out of the hand and the revealed states can still be read.
  return (
    <div
      key={questionIndex}
      role="group"
      aria-label="Your hand"
      className="flex items-end justify-center px-5 pt-10 pb-4 max-sm:grid max-sm:auto-rows-fr max-sm:grid-cols-2 max-sm:items-stretch max-sm:gap-2.5 max-sm:px-0 max-sm:pt-3 short:grid! short:grid-cols-4! short:gap-2! short:px-0 short:pt-5! short:pb-0"
    >
      {answerChoices.map((value: string, index: number) => {
        const isSelected = currentAnswer === value;
        const isCorrect = correctAnswers.includes(value);

        // At rest: the fan. After a pick (isDisabled goes true once a choice
        // is locked): the played card lifts out of the hand, mint if it took
        // the trick, coral if not, with the right card ringed in mint.
        let stateCls = `${FAN[index]} bg-card hover:rotate-0 hover:-translate-y-4 max-sm:hover:translate-y-0`;
        if (isDisabled) {
          if (isSelected && isCorrect) {
            stateCls = "rotate-0 -translate-y-[26px] bg-mint max-sm:translate-y-0";
          } else if (isSelected) {
            stateCls = "rotate-0 -translate-y-[26px] bg-coral max-sm:translate-y-0";
          } else if (isCorrect) {
            stateCls = `${FAN[index]} bg-card ring-4 ring-mint`;
          } else {
            stateCls = `${FAN[index]} bg-card opacity-80`;
          }
        }

        // Spoken only after the reveal, so the outcome isn't just a colour.
        let srState = "";
        if (isDisabled) {
          if (isCorrect && isSelected) srState = "Your card, a hit";
          else if (isCorrect) srState = "The right card";
          else if (isSelected) srState = "Your card, a miss";
        }

        return (
          <button
            key={`answer-${questionIndex}-${index}`}
            type="button"
            aria-disabled={isDisabled}
            onClick={() => {
              if (isDisabled) return;
              handleAnswer(null, value);
            }}
            className={`relative -mx-3.5 flex min-h-[150px] w-[150px] origin-[50%_120%] flex-col justify-between rounded-xl border-2 border-ink px-3 pt-3 pb-3.5 text-left font-body text-[15px] font-bold leading-[1.2] text-ink shadow-[0_4px_0_rgb(23_19_16/0.35)] transition-transform duration-200 animate-lift focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-sun max-sm:mx-0 max-sm:min-h-[96px] max-sm:w-auto max-sm:rotate-0 max-sm:translate-y-0 short:mx-0! short:min-h-0! short:w-auto! short:rotate-0! short:translate-y-0! short:py-2 ${
              isDisabled ? "cursor-default" : "cursor-pointer"
            } ${stateCls}`}
            style={{ animationDelay: `${index * 0.07}s` }}
          >
            <span
              aria-hidden="true"
              className={`font-display text-xl leading-none ${
                isDisabled && isSelected ? "text-ink" : "text-coral-ink"
              }`}
            >
              {LETTERS[index]}
            </span>
            <span className="my-2 max-sm:flex-1">{value}</span>
            <span
              aria-hidden="true"
              className={`self-end text-xl leading-none short:hidden ${suitRed ? "text-coral-ink" : "text-ink"} opacity-60`}
            >
              {suit || LETTERS[index]}
            </span>
            {srState && <span className="sr-only">{srState}</span>}
          </button>
        );
      })}
    </div>
  );
};

export default TriviaAnswers;
