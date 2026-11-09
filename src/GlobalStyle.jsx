import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --pine-900: #0b231d;
    --pine-800: #12352b;
    --pine-700: #1a4a3b;
    --pine-500: #2f7a5f;
    --berry-700: #8e1b24;
    --berry-600: #b3262e;
    --berry-500: #d23c40;
    --gold-500: #d9a84e;
    --gold-300: #f1d495;
    --snow: #fffaf1;
    --ivory: #fff8ec;
    --ink: #3a2a1e;
    --ink-soft: #6b5646;
    --line: #ecdcc0;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body, div, span, h1, h2, h3, h4, h5, h6, p, a, img, ol, ul, li,
  button, input, section, header, footer {
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    vertical-align: baseline;
  }

  html {
    -webkit-text-size-adjust: 100%;
  }

  body {
    min-height: 100vh;
    min-height: 100dvh;
    line-height: 1.4;
    color: var(--ink);
    font-family: "MaruBuri", "경기천년바탕_Regular", serif;
    background:
      radial-gradient(ellipse at 50% -10%, rgba(241, 212, 149, 0.22), transparent 55%),
      linear-gradient(180deg, var(--pine-900) 0%, var(--pine-800) 55%, var(--pine-700) 100%);
    background-attachment: fixed;
    overflow-x: hidden;
  }

  ol, ul {
    list-style: none;
  }

  button {
    cursor: pointer;
    background: none;
    color: inherit;
  }

  input {
    color: inherit;
  }
`;
