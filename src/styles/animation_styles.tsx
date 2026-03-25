/** @jsxImportSource @emotion/react */
import { keyframes } from "@emotion/react";

export const fadeIn = keyframes`
0% { opacity: 0; }
100% { opacity: 1; };`;

export const slideUp = keyframes`
0% {top: 5rem; opacity: 0; }
100% {top: 0; opacity: 1; };`;

export const colorChange = keyframes`
0% {transform: scale(1.3)}
100% {transform: scale(1) };`;
