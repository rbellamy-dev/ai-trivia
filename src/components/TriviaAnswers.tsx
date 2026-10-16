import { Ring, Strike } from "./Marks";

const LETTERS = ["A", "B", "C", "D"];

const TriviaAnswers = ({
  isDisabled,
  onAnswer,
  currentAnswer,
  answerChoices,
  correctAnswers,
}: {
  isDisabled: boolean;
  onAnswer: (choice: string) => void;
  currentAnswer: string;
  answerChoices: string[];
  correctAnswers: string[];
}) => {
  // Buttons, not radios. Picking an answer is immediate and final, so each
  // choice is an action, not a form value: one button per answer, every one
  // its own tab stop, Enter/Space plays it.
  //
  // After a pick they stay focusable (aria-disabled, not disabled) so the
  // revealed states can still be read.
  return (
    <div role="group" aria-label="Answers" className="grid grid-cols-2 gap-3 max-sm:gap-2.5">
      {answerChoices.map((value, index) => {
        const isSelected = currentAnswer === value;
        const isCorrect = correctAnswers.includes(value);

        // The result is shown as text too, never by colour or mark alone.
        let tag = "";
        let srState = "";
        if (isDisabled) {
          if (isCorrect && isSelected) [tag, srState] = ["Correct", "Your answer, correct"];
          else if (isCorrect) [tag, srState] = ["Answer", "The right answer"];
          else if (isSelected) [tag, srState] = ["Your pick", "Your answer, incorrect"];
        }

        const state = !isDisabled
          ? "border-edge hover:border-ink"
          : isCorrect
            ? "border-transparent font-medium text-hit"
            : isSelected
              ? "border-line text-muted"
              : "border-line text-muted";

        return (
          <button
            key={value}
            type="button"
            aria-disabled={isDisabled}
            aria-keyshortcuts={LETTERS[index]}
            onClick={() => {
              if (!isDisabled) onAnswer(value);
            }}
            className={`relative flex min-h-14 flex-wrap items-center gap-x-3 gap-y-1 rounded-lg border bg-card px-4 py-3 text-left text-[1.0625rem] leading-snug transition-colors duration-200 animate-rise max-sm:min-h-12 max-sm:px-3 max-sm:text-[0.9375rem] ${
              isDisabled ? "cursor-default" : "cursor-pointer"
            } ${state}`}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <span aria-hidden="true" className="font-mono text-[0.8125rem] text-muted">
              {LETTERS[index]}
            </span>
            <span className="min-w-0 flex-1">{value}</span>
            {tag && (
              <span
                aria-hidden="true"
                className={`text-[0.8125rem] font-medium max-sm:w-full ${
                  isCorrect ? "text-hit" : "text-pencil-text"
                }`}
              >
                {tag}
              </span>
            )}
            {isDisabled && isCorrect && (
              <Ring className="-top-2 -left-2.5 h-[calc(100%+16px)] w-[calc(100%+20px)]" />
            )}
            {isDisabled && isSelected && !isCorrect && (
              <Strike className="top-1/2 left-8 h-3 w-[calc(100%-7rem)] -translate-y-1/2 max-sm:top-[38%] max-sm:w-[calc(100%-3rem)]" />
            )}
            {srState && <span className="sr-only">{srState}</span>}
          </button>
        );
      })}
    </div>
  );
};

export default TriviaAnswers;
