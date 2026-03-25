/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { fadeIn, colorChange } from "./animation_styles";

export const headerStyle = () =>
  css({
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    fontSize: "1.6rem",
    color: "#2D2D2D"
  });

export const questionStyle = () =>
  css({
    display: "flex",
    padding: "1rem, 0",
    textAlign: "left",
    margin: "1.6rem 0 0 0",
    fontSize: "1.6rem",
    fontWeight: 400,
    animation: `${fadeIn} .5s `
  });

export const numberStyle = () =>
  css({
    display: "flex",
    fontSize: "2rem",
    "@media (max-width: 30rem)": {
      fontSize: "1.8rem"
    }
  });

export const scoreStyle = () =>
  css({
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    fontWeight: 700,
    fontSize: "2rem",
    margin: 0,
    "@media (max-width: 30rem)": {
      flexDirection: "column",
      marginTop: "2rem",
      height: "6rem",
      textAlign: "left"
    }
  });

export const counterStyle = () =>
  css({
    animation: `${colorChange} .7s `,
    marginLeft: ".5rem"
  });
