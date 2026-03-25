/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { fadeIn } from "./animation_styles";

export const answerStyle = () =>
  css({
    display: "grid",
    gridGap: "1.6rem",
    gridTemplateColumns: "repeat(2,1fr)",
    textAlign: "left",
    marginTop: "1.6rem",
    "@media (max-width: 50rem)": {
      gridTemplateColumns: "repeat(1,1fr)"
    }
  });

export const choiceStyle = (isCorrect: boolean, isDisabled: boolean) =>
  css({
    display: "flex",
    color: !isCorrect && isDisabled ? "#757575" : "#2d2d2d",
    width: "100%",
    alignItems: "center",
    lineHeight: "2.4rem",
    transition: "color .3s",
    animation: `${fadeIn} .4s `,

    "& > label": {
      display: "flex",
      pointEvents: !isCorrect && isDisabled ? "none" : "auto",
      cursor: "default"
    },
    "& > span": {
      display: "flex",
      cursor: "default",
      paddingLeft: "1.2rem",
      fontSize: "1.6rem"
    }
  });

export const radioStyle = (isCorrect: boolean, isDisabled: boolean) =>
  css({
    appearance: "none",
    backgroundColor: "#ffffff",
    margin: "0",
    color: "#065FB1",
    width: "2.4rem",
    height: "2.4rem",
    border: "1px solid #C0C0C0",
    borderRadius: "50%",
    display: "grid",
    placeContent: "center",
    cursor: isDisabled ? "default" : "pointer",
    "&::before": {
      content: "''",
      width: "2.4rem",
      height: "2.4rem",
      borderRadius: "50%",
      transform: "scale(0)",
      transition: "120ms transform ease-in-out",
      boxShadow: "inset 2rem 4rem #065FB1"
    },
    "&:checked::before ": {
      transform: "scale(.5)"
    }
  });
