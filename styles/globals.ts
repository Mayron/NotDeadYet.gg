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

  ul,
  ol {
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
        font-size: ${fontSize}rem;
        line-height: normal;
        text-transform: uppercase;
        margin-bottom: 20px;

        ${media.down("sm")`
          font-size: ${fontSize * 0.85}rem;
        `};
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
  }

  button,
  input:not([type="text"]),
  input:not([type="number"]) {
    &:hover {
      cursor: pointer;
    }
  }

  input[type="text"],
  textarea {
    &:focus,
    &:hover {
      cursor: text;
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

    ${media.down("xs")`
      padding: ${vars.sectionMobilePadding};
    `};
  }

  article {
    padding: 0 15px;

    ${media.down("xs")`
      padding: 0;
    `};

    ul,
    p {
      &:not(:last-child) {
        padding-bottom: 20px;
      }
    }

    li:not(:last-child) {
      padding-bottom: 10px;
    }

    header {
      padding: 0 2rem;

      ${media.down("sm")`padding: 0;`};
    }

    h3:not(:first-child) {
      margin-top: 20px;
    }

    h4 {
      margin-top: 20px;
      font-size: 1.75rem;
      margin-bottom: 10px;
    }

    h5 {
      margin-top: 10px;
      font-size: 1.275rem;
      margin-bottom: 5px;
    }
  }

  hr {
    margin: 40px auto;
    border: none;
    background-color: ${colors.grey.border};
    height: 1px;

    ${media.down("sm")`
      margin: 20px auto;
    `};
  }

  ::-webkit-input-placeholder,
  :-moz-placeholder,
  ::-moz-placeholder,
  :-ms-input-placeholder {
    font-family: ${vars.font.standard.family};
  }

  .death-knight {
    font-weight: ${vars.font.standard.weights.bold};
    color: #c41e3a;
  }

  .druid {
    font-weight: ${vars.font.standard.weights.bold};
    color: #ff7c0a;
  }

  .hunter {
    font-weight: ${vars.font.standard.weights.bold};
    color: #aad372;
  }

  .mage {
    font-weight: ${vars.font.standard.weights.bold};
    color: #3fc7eb;
  }

  .paladin {
    font-weight: ${vars.font.standard.weights.bold};
    color: #f48cba;
  }

  .priest {
    font-weight: ${vars.font.standard.weights.bold};
  }

  .rogue {
    font-weight: ${vars.font.standard.weights.bold};
    color: #9f9200;
  }

  .shaman {
    font-weight: ${vars.font.standard.weights.bold};
    color: #0070dd;
  }

  .warlock {
    font-weight: ${vars.font.standard.weights.bold};
    color: #8788ee;
  }

  .warrior {
    font-weight: ${vars.font.standard.weights.bold};
    color: #c69b6d;
  }

  .user-id {
    display: block;
    font-size: 11px;
    color: ${colors.grey.font};
    font-weight: 400;
  }

  dt {
    text-transform: uppercase;
    color: ${colors.text.secondary};
    font-size: 0.85rem;
  }

  dd {
    font-weight: ${vars.font.standard.weights.medium};
  }

  dl {
    list-style-type: none;
    li {
      padding-bottom: 20px;
    }

    li:last-child {
      padding-bottom: 0;
    }
  }

  .grey-box {
    border: 1px solid #e1e1e1;
    padding: 10px;
    background-color: #f9f9f9;
    border-radius: 2px;
  }
`;

export default globalStyles;
