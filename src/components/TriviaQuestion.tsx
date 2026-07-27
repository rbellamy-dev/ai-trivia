const TriviaQuestion = ({
  currentQuestion,
  questions,
  questionIndex,
  score,
}: {
  currentQuestion: string;
  questions: number;
  questionIndex: number;
  score: number;
}) => {
  return (
    <section className="flex w-full flex-col">
      <div className="flex w-full items-baseline justify-between font-display text-[11px] font-light uppercase tracking-[0.3em]">
        <span className="text-teal">
          Star {String(questionIndex).padStart(2, "0")} / {questions}
        </span>
        <span className="flex items-baseline gap-2 text-fog">
          Score
          <span
            key={score}
            className="inline-block text-starlight animate-pop"
          >
            {score}
          </span>
        </span>
      </div>
      <h2
        key={questionIndex}
        className="mt-4 text-left font-body text-[34px] font-light leading-[1.3] text-starlight [text-shadow:0_0_40px_rgb(110_231_216_/_0.15)] animate-fade-in max-[720px]:text-2xl"
      >
        {currentQuestion}
      </h2>
    </section>
  );
};

export default TriviaQuestion;
