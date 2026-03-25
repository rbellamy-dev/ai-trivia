/** @jsxImportSource @emotion/react */
import { ChangeEvent } from "react";
import { answerStyle, choiceStyle, radioStyle } from "./styles/trivia_answers";

const TriviaAnswers = ({
  isDisabled,
  handleAnswer,
  currentAnswer,
  answerChoices,
  questionIndex
}: {
  isDisabled: boolean;
  handleAnswer: (e: ChangeEvent | null, s?: string) => void;
  currentAnswer: string;
  answerChoices: string[];
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
    <form key={questionIndex} className="answers" css={answerStyle()}>
      {answerChoices.map((value: string, index: number) => {
        return (
          <div
            css={choiceStyle(currentAnswer === value, isDisabled)}
            key={`questions[questionNumber].id - ${index}`}
          >
            <label htmlFor={`answer-${index}`}>
              <input
                onKeyDown={(e) => handleTab(e)}
                css={radioStyle(currentAnswer !== value, isDisabled)}
                aria-label={value}
                id={`answer-${index}`}
                type="radio"
                value={value}
                checked={currentAnswer === value}
                onChange={(e) => handleAnswer(e)}
              />
            </label>
            <span>{value}</span>
          </div>
        );
      })}
    </form>
  );
};

export default TriviaAnswers;
