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
  const handleTab = (event: any) => {
    //handles tab selection
    const target = event.currentTarget as HTMLInputElement;
    if (event.key.toLowerCase() === "tab") {
      const form = event.target.form;
      const index = [...form].indexOf(event.target);
      if (index < form.length - 1) {
        form.elements[index + 1].focus();
        event.preventDefault();
      }
    } else if (event.key.toLowerCase() === "enter") {
      handleAnswer(null, target.value);
    }
  };

  return (
    <form
      key={questionIndex}
      className="answers mt-4 grid grid-cols-2 gap-3 text-left max-[500px]:grid-cols-1"
    >
      {answerChoices.map((value: string, index: number) => {
        const isSelected = currentAnswer === value;
        const isCorrect = correctAnswers.includes(value);

        // Post-answer states (isDisabled goes true once a choice is locked).
        let stateCls =
          "border-starlight/15 bg-starlight/3 hover:border-teal/60 hover:bg-teal/5 hover:shadow-[0_0_26px_-6px_var(--color-teal)]";
        let dotCls = "bg-starlight/25";
        if (isDisabled) {
          if (isCorrect) {
            stateCls = "border-correct/70 bg-correct/8";
            dotCls =
              "bg-correct shadow-[0_0_10px_var(--color-correct)]";
          } else if (isSelected) {
            stateCls = "border-wrong/70 bg-wrong/8";
            dotCls = "bg-wrong shadow-[0_0_10px_var(--color-wrong)]";
          } else {
            stateCls = "border-starlight/15 bg-starlight/3 opacity-30";
          }
        }

        return (
          <label
            key={`answer-${questionIndex}-${index}`}
            className={`flex items-center gap-3.5 rounded-xl border px-[22px] py-3.5 font-body text-[15px] font-light leading-6 text-starlight backdrop-blur-sm transition duration-200 animate-drift-in has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-teal ${
              isDisabled ? "cursor-default" : "cursor-pointer"
            } ${stateCls}`}
            style={{ animationDelay: `${index * 0.06}s` }}
          >
            <input
              onKeyDown={(e) => handleTab(e)}
              className={`m-0 h-2.5 w-2.5 flex-none appearance-none rounded-full outline-none transition duration-200 checked:animate-pop ${dotCls} ${
                isDisabled ? "cursor-default" : "cursor-pointer"
              }`}
              aria-label={value}
              id={`answer-${index}`}
              type="radio"
              value={value}
              checked={isSelected}
              onChange={(e) => handleAnswer(e)}
              disabled={isDisabled}
            />
            <span>{value}</span>
          </label>
        );
      })}
    </form>
  );
};

export default TriviaAnswers;
