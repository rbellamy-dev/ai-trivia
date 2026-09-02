import { ChangeEvent } from "react";

const TriviaAnswers = ({
  isDisabled,
  handleAnswer,
  currentAnswer,
  answerChoices,
  correctAnswers,
  questionIndex,
}: {
  isDisabled: boolean;
  handleAnswer: (e: ChangeEvent | null, s?: string) => void;
  currentAnswer: string;
  answerChoices: string[];
  correctAnswers: string[];
  questionIndex: number;
}) => {
  // Buttons, not radios. A radio group is a single tab stop with arrow keys
  // moving between options -- and moving the selection *is* a change event, so
  // the first arrow press committed an answer and locked the question. Picking
  // here is immediate and final, so each choice is an action, not a form value:
  // one button per choice, every one its own tab stop, Enter/Space commits.
  //
  // After a pick they stay focusable (aria-disabled, not disabled) so focus is
  // never yanked out of the group and the revealed states can still be read.
  return (
    <div
      key={questionIndex}
      role="group"
      aria-label="Answer choices"
      className="answers mt-4 grid grid-cols-2 gap-3 text-left max-[500px]:grid-cols-1"
    >
      {answerChoices.map((value: string, index: number) => {
        const isSelected = currentAnswer === value;
        const isCorrect = correctAnswers.includes(value);

        // Post-answer states (isDisabled goes true once a choice is locked).
        let stateCls =
          "border-starlight/15 bg-starlight/3 hover:border-ember/60 hover:bg-ember/5 hover:shadow-[0_0_26px_-6px_var(--color-ember)]";
        let dotCls = "bg-starlight/25";
        if (isDisabled) {
          if (isCorrect) {
            stateCls = "border-correct/70 bg-correct/8";
            dotCls = "bg-correct shadow-[0_0_10px_var(--color-correct)]";
          } else if (isSelected) {
            stateCls = "border-wrong/70 bg-wrong/8";
            dotCls = "bg-wrong shadow-[0_0_10px_var(--color-wrong)]";
          } else {
            stateCls = "border-starlight/15 bg-starlight/3 opacity-30";
          }
        }

        // Spoken only after the reveal, so the outcome isn't just a colour.
        let srState = "";
        if (isDisabled) {
          if (isCorrect && isSelected) srState = "Your answer, correct";
          else if (isCorrect) srState = "Correct answer";
          else if (isSelected) srState = "Your answer, incorrect";
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
            className={`flex items-center gap-3.5 rounded-xl border px-[22px] py-3.5 text-left font-body text-[15px] font-light leading-6 text-starlight backdrop-blur-sm transition duration-200 animate-drift-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember ${
              isDisabled ? "cursor-default" : "cursor-pointer"
            } ${stateCls}`}
            style={{ animationDelay: `${index * 0.06}s` }}
          >
            <span
              aria-hidden="true"
              className={`m-0 h-2.5 w-2.5 flex-none rounded-full transition duration-200 ${dotCls} ${
                isSelected ? "animate-pop" : ""
              }`}
            />
            <span>{value}</span>
            {srState && <span className="sr-only">{srState}</span>}
          </button>
        );
      })}
    </div>
  );
};

export default TriviaAnswers;
