import React from "react";
import { css } from "@emotion/react";
import blizBtnHover from "../public/assets/bliz-btn-hover.png";
import blizBtnNormal from "../public/assets/bliz-btn-normal.png";
import blizBtnActive from "../public/assets/bliz-btn-active.png";
import Route from "./route";

interface IBlizzardButtonProps {
  text: string;
  href: string;
}

const BlizzardButton: React.FC<IBlizzardButtonProps> = ({ text, href }) => (
  <button
    css={css`
      background-image: url(${blizBtnNormal.src});
      height: ${blizBtnNormal.height}px;
      width: ${blizBtnNormal.width}px;
      transform: scale(1.2);

      &:hover {
        background-image: url(${blizBtnHover.src});
      }

      &:active {
        background-image: url(${blizBtnActive.src});
      }
    `}
    type="button"
  >
    <Route to={href}>
      <span
        css={css`
          color: #fdd400;
          text-shadow: 2px 2px 2px black;
        `}
      >
        {text}
      </span>
    </Route>
  </button>
);

export default BlizzardButton;
