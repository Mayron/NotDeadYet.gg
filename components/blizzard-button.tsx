import React, { type MouseEventHandler } from "react";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import blizBtnHover from "../public/assets/bliz-btn-hover.png";
import blizBtnNormal from "../public/assets/bliz-btn-normal.png";
import blizBtnActive from "../public/assets/bliz-btn-active.png";

interface IBlizzardButtonProps {
  text: string;
  href?: string;
  submit?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const BlizzardButton: React.FC<IBlizzardButtonProps> = ({
  text,
  href,
  submit = false,
  onClick,
}) => {
  const router = useRouter();
  let handleOnClick: MouseEventHandler<HTMLButtonElement> | undefined;

  if (onClick || href) {
    handleOnClick = async (e) => {
      e.preventDefault();

      if (onClick) {
        onClick(e);
      }

      if (href) {
        await router.push(href);
      }
    };
  }

  return (
    <button
      type={submit ? "submit" : "button"}
      onClick={handleOnClick}
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
    >
      <span
        css={css`
          color: #fdd400;
          text-shadow: 2px 2px 2px black;
        `}
      >
        {text}
      </span>
    </button>
  );
};

export default BlizzardButton;
