/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { slideUp } from "./animation_styles";

export const wrapper = () =>
  css({
    display: "flex",
    lineHeight: 1.5,
    minWidth: "24rem",
    padding: "0 2rem",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    flexDirection: "column",
    height: "100%",
    boxSizing: "border-box",
    fontFamily: "Roboto",
    "@media (max-width: 50rem)": {
      padding: "2rem"
    }
  });

export const contentStyle = () =>
  css({
    minHeight: "38rem",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    width: "80.8rem",
    border: "1px solid #2D2D2D",
    padding: "5.6rem 4.8rem 4.8rem 4.8rem",
    borderRadius: 4,
    backgroundColor: "#ffffff",
    boxShadow: "0 0 1rem 0 rgba(0, 0, 0, .2)",
    position: "relative",
    "@media (max-width: 52rem)": {
      width: "100%"
    },
    "@media (max-width: 30rem)": {
      padding: "2.5rem",
      minHeight: "auto"
    }
  });

export const textStyle = (correctAnswer?: boolean) =>
  css({
    color: correctAnswer ? "#065927" : "#E60000",
    fontSize: "1.6rem",
    textAlign: "left",
    fontWeight: 700,
    position: "relative",
    marginTop: "2.5rem",
    animation: `${slideUp} .3s `,
    "@media (max-width: 50rem)": {
      alignSelf: "center"
    }
  });
