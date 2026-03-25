/** @jsxImportSource @emotion/react */
import {
  headerStyle,
  questionStyle,
  numberStyle,
  scoreStyle,
  counterStyle
} from "./styles/trivia_question";

const TriviaQuestion = ({
  currentQuestion,
  questions,
  questionIndex,
  score
}: {
  currentQuestion: string;
  questions: number;
  questionIndex: number;
  score: number;
}) => {
  return (
    <section css={headerStyle()}>
      <h1 css={scoreStyle()}>
        <span>
          Question {questionIndex} of {questions}
        </span>
        <span css={numberStyle()}>
          {" "}
          Score
          <span key={score} css={counterStyle()}>
            {score}
          </span>
        </span>
      </h1>
      <h2 key={questionIndex} css={questionStyle()}>
        {currentQuestion}
      </h2>
    </section>
  );
};

export default TriviaQuestion;
