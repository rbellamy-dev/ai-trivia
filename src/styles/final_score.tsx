/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { fadeIn } from "./animation_styles";

export const finalStyle = () =>
  css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    color: "#2D2D2D",
    animation: `${fadeIn} .6s `,
    fontSize: "1.6rem"
  });

export const messageStyle = () =>
  css({
    fontSize: "3.6rem",
    fontWeight: 700,
    lineHeight: 1.5,
    display: "inline-block",
    margin: 0
  });

export const resultStyle = () =>
  css({
    color: "#2D2D2D",
    margin: "1.8rem 0 0 0",
    display: "inline-block",
    fontSize: "1.6rem",
    fontWeight: 400
  });

export const highScoreStyle = () =>
  css({
    color: "#2D2D2D",
    margin: "1.6rem 0 0 0",
    display: "inline-block",
    fontSize: "1.6rem",
    fontWeight: 400
  });

export const triviaButtonStyle = () =>
  css({
    display: "flex",
    justifyContent: "center"
  });

export const medalStyle = () =>
  css({
    width: "10rem",
    filter: "drop-shadow(0 0 .1rem #000000)",
    display: "flex",
    alignSelf: "center",
    marginBottom: "2rem"
  });
