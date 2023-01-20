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

  #__next {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  main {
    display: flex;
    flex-direction: column;
    background-color: ${colors.background};
    transition: margin-top 0.2s ease-in;
    position: relative;
    flex: 1;
  }

  ul,
  ol {
    margin-left: 18px;

    &.no-markers {
      margin-left: 0;
      list-style-type: none;
    }
  }

  .text-lg {
    font-size: 1.125rem;
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
        ${index < 4
          ? css`
              font-family: ${vars.font.header.family};
              font-weight: ${vars.font.header.weight};
            `
          : css`
              font-family: ${vars.font.standard.family};
              font-weight: ${vars.font.standard.weights.medium};
            `}

        font-size: ${fontSize}rem;
        line-height: normal;
        text-transform: uppercase;
        margin-bottom: 10px;

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
    max-width: 100%;
  }

  section {
    position: relative;
    max-width: ${vars.maxContentSize};
    width: 100%;
    margin: 0 auto;
    padding: ${vars.sectionPadding};

    ${media.down("xs")`
      padding: ${vars.sectionMobilePadding};
    `};
  }

  article {
    padding: 0 15px;

    ${media.down("xs")`
      padding: 0 10px;
    `};

    a {
      color: ${colors.link.default};

      &:hover {
        text-decoration: underline;
      }
    }

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

  .death-knight,
  .death-knight a {
    font-weight: ${vars.font.standard.weights.bold};
    color: #c41e3a !important;

    &:is(a):hover {
      color: #d92a48 !important;
    }
  }

  .druid,
  .druid a {
    font-weight: ${vars.font.standard.weights.bold};
    color: #ff7c0a !important;

    &:is(a):hover {
      color: #ff9538 !important;
    }
  }

  .hunter,
  .hunter a {
    font-weight: ${vars.font.standard.weights.bold};
    color: #aad372 !important;

    &:is(a):hover {
      color: #b3e26f !important;
    }
  }

  .mage,
  .mage a {
    font-weight: ${vars.font.standard.weights.bold};
    color: #3fc7eb !important;

    &:is(a):hover {
      color: #64d8f9 !important;
    }
  }

  .paladin,
  .paladin a {
    font-weight: ${vars.font.standard.weights.bold};
    color: #f48cba !important;

    &:is(a):hover {
      color: #ffa7ce !important;
    }
  }

  .priest,
  .priest a {
    font-weight: ${vars.font.standard.weights.bold};
    color: ${colors.black} !important;

    &:is(a):hover {
      color: #484848 !important;
    }
  }

  .rogue,
  .rogue a {
    font-weight: ${vars.font.standard.weights.bold};
    color: #9f9200 !important;

    &:is(a):hover {
      color: #d0be00 !important;
    }
  }

  .shaman,
  .shaman a {
    font-weight: ${vars.font.standard.weights.bold};
    color: #0070dd !important;

    &:is(a):hover {
      color: #2290ff !important;
    }
  }

  .warlock,
  .warlock {
    font-weight: ${vars.font.standard.weights.bold};
    color: #8788ee !important;

    &:is(a):hover {
      color: #a3a4f7 !important;
    }
  }

  .warrior,
  .warrior a {
    font-weight: ${vars.font.standard.weights.bold};
    color: #c69b6d !important;

    &:is(a):hover {
      color: #d2a87b !important;
    }
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
    font-size: 0.95rem;
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

    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }
`;

export default globalStyles;
