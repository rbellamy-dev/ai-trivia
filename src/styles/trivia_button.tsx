/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const buttonStyle = () =>
  css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "start",
    minHeight: "4.4rem",
    width: "14.5rem",
    backgroundColor: "#065FB1",
    color: "white",
    fontWeight: 700,
    borderRadius: ".8rem",
    fontSize: "1.6rem",
    border: 0,
    marginTop: "2.4rem",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "rgba(6,95,177, 0.8)",
      transition: "background-color 0.3s"
    },
    "@media (max-width: 50rem)": {
      alignSelf: "center"
    }
  });
