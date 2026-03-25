/** @jsxImportSource @emotion/react */
import { useState, useEffect, ChangeEvent } from "react";
import { questions } from "./questions";
import TriviaButton from "./TriviaButton";
import FinalScore from "./FinalScore";
import TriviaQuestion from "./TriviaQuestion";
import TriviaAnswers from "./TriviaAnswers";
import { wrapper, contentStyle, textStyle } from "./styles/trivia";

const Trivia = () => {
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [isDisabled, setDisabled] = useState<boolean>(false);

  const [selection, setSelection] = useState<
    { index: number; choice: string }[]
  >(
    //keeps track of user's choice selection
    new Array(questions.length).fill(null).map((_item, i) => {
      return { index: i, choice: "" };
    })
  );

  useEffect(() => {
    if (!gameOver) {
      //reset values when game starts over
      setScore(0);
      setQuestionIndex(0);
      setDisabled(false);
    }
  }, [gameOver]);

  const handleAnswer = (event: ChangeEvent | null, val?: string) => {
    //updates user's answer selection
    setDisabled(true);
    const choice = (event?.target as HTMLInputElement)?.value || val;

    const isCorrect = questions[questionIndex].answer.some(
      (item) => item === choice
    );
    if (!isDisabled && choice) {
      setSelection(
        selection.map((item, index) => {
          return index === questionIndex ? { ...item, choice } : item;
        })
      );
      if (isCorrect) {
        setScore(score + 1);
      }
    }
    setShowMessage(true);
  };

  const handleButton = () => {
    //updates selection values and button text
    if (!selection[questionIndex].choice) {
      setShowMessage(true);
    } else if (questions.length - 1 === questionIndex) {
      setGameOver(true);
      setShowMessage(false);
      setSelection(
        new Array(questions.length).fill(null).map((_item, i) => {
          return { index: i, choice: "" };
        })
      );
    } else {
      setQuestionIndex(questionIndex + 1);
      setShowMessage(false);
      setDisabled(false);
    }
  };

  const isCorrect = () => {
    return questions[questionIndex].answer.some(
      (item) => item === selection[questionIndex].choice
    );
  };

  return (
    <main css={wrapper()}>
      <section css={contentStyle()}>
        {!gameOver && (
          <>
            <TriviaQuestion
              currentQuestion={questions[questionIndex].question}
              questionIndex={questionIndex + 1}
              questions={questions.length}
              score={score}
            />

            <TriviaAnswers
              handleAnswer={handleAnswer}
              isDisabled={isDisabled}
              currentAnswer={selection[questionIndex].choice}
              answerChoices={questions[questionIndex].choices}
              questionIndex={questionIndex}
            />
            {showMessage && (
              <span
                key={selection[questionIndex].choice}
                css={textStyle(isCorrect())}
              >
                {!selection[questionIndex].choice
                  ? "Please choose an answer."
                  : isCorrect()
                  ? "You got it right!"
                  : "Wrong Answer!"}
              </span>
            )}
            <TriviaButton
              handleButton={handleButton}
              buttonText={
                questions.length - 1 === questionIndex
                  ? "See Your Score!"
                  : "Next Question"
              }
            />
          </>
        )}

        {gameOver && (
          <FinalScore
            questions={questions.length}
            score={score}
            setGameOver={setGameOver}
          />
        )}
      </section>
    </main>
  );
};

export default Trivia;
