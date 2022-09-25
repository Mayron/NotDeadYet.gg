import { css } from "@emotion/react";
import colors from "./colors";
import fonts from "./fonts";
import media from "./media-queries";
import vars from "./vars";

const globalStyles = css`
  ${fonts};

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  main {
    background-color: ${colors.background};
    transition: margin-top 0.2s ease-in;
    min-height: 100vh;
    position: relative;
  }

  ul {
    margin-left: 18px;

    &.no-markers {
      margin-left: 0;
      list-style-type: none;
    }
  }

  body,
  button,
  input,
  textarea,
  html {
    font-family: ${vars.font.standard.family};
    font-weight: ${vars.font.standard.weights.regular};
    font-size: ${vars.font.standard.size};
    line-height: ${vars.font.standard.lineHeight};

    ${media.down("xs")`
      font-size: ${vars.font.mobile.size};
      line-height: ${vars.font.mobile.lineHeight};
    `};
  }

  ${vars.font.header.sizes.map((fontSize, index) => {
    const tag = `h${index + 1}`;

    return css`
      ${tag} {
        font-family: ${vars.font.header.family};
        font-weight: ${vars.font.header.weight};
        font-size: ${fontSize};
        line-height: normal;
        text-transform: uppercase;
        margin-bottom: 20px;
      }
    `;
  })}

  h1, h2, h3 {
    text-align: center;
  }

  a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;

    &.text {
      color: ${colors.link.default};
      font-weight: ${vars.font.standard.weights.medium};
    }

    &:hover {
      color: ${colors.link.hover};
    }

    &:active {
      color: ${colors.link.active};
    }
  }

  label {
    font-weight: ${vars.font.standard.weights.medium};
    user-select: none;

    &[for] {
      cursor: pointer;
    }
  }

  input,
  textarea,
  button {
    background: none;
    outline: none;
    user-select: none;
    display: block;
    border: none;

    &:hover {
      cursor: pointer;
    }
  }

  img {
    -webkit-user-drag: none;
    user-select: none;
    display: block;
  }

  section {
    position: relative;
    max-width: ${vars.maxContentSize};
    margin: 0 auto;
    padding: ${vars.sectionPadding};
  }

  article {
    ul,
    p {
      &:not(:last-child) {
        padding-bottom: 20px;
      }
    }

    li:not(:last-child) {
      padding-bottom: 10px;
    }

    h3 {
      margin-top: 20px;
    }

    h4 {
      font-size: 1.4rem;
    }
  }

  hr {
    margin: 40px auto;
    border: none;
    background-color: #c1c1c1;
    height: 1px;
  }

  ::-webkit-input-placeholder,
  :-moz-placeholder,
  ::-moz-placeholder,
  :-ms-input-placeholder {
    font-family: ${vars.font.standard.family};
  }
`;

export default globalStyles;
