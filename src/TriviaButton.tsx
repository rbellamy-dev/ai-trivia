/** @jsxImportSource @emotion/react */
// import { buttonStyle } from "./styles";
import { MouseEvent } from "react";
import { buttonStyle } from "./styles/trivia_button";

const TriviaButton = ({
  handleButton,
  buttonText
}: {
  handleButton?: (b: MouseEvent) => void;
  buttonText: string;
}) => {
  return (
    <button css={buttonStyle()} onClick={handleButton}>
      {buttonText}
    </button>
  );
};

export default TriviaButton;
