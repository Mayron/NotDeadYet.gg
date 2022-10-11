import React, { type MouseEventHandler } from "react";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";
import blizBtnHover from "../public/assets/bliz-btn-hover.png";
import blizBtnNormal from "../public/assets/bliz-btn-normal.png";
import blizBtnActive from "../public/assets/bliz-btn-active.png";

interface IBlizzardButtonProps {
  text: string;
  href?: string;
  submit?: boolean;
  loading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const BlizzardButton: React.FC<IBlizzardButtonProps> = ({
  text,
  href,
  submit = false,
  loading = false,
  onClick,
}) => {
  const router = useRouter();
  let handleOnClick: MouseEventHandler<HTMLButtonElement> | undefined;

  if ((onClick || href) && !loading) {
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

  const width = blizBtnNormal.width * 1.2;
  const height = blizBtnNormal.height * 1.2;

  return (
    <button
      type={submit ? "submit" : "button"}
      disabled={loading}
      onClick={handleOnClick}
      css={css`
        height: ${height}px;
        width: ${width}px;
        position: relative;

        img {
          position: absolute;
        }

        .bliz-btn-hover,
        .bliz-btn-active {
          display: none;
        }

        &:disabled {
          filter: grayscale(1);
          cursor: default;
        }

        &:not(:disabled) {
          &:hover {
            .bliz-btn-hover {
              display: block;
            }

            .bliz-btn-norm,
            .bliz-btn-active {
              display: none;
            }
          }

          &:active {
            .bliz-btn-active {
              display: block;
            }

            .bliz-btn-norm,
            .bliz-btn-hover {
              display: none;
            }
          }
        }
      `}
    >
      <picture>
        <img
          width={width}
          height={height}
          className="bliz-btn-norm"
          src={blizBtnNormal.src}
          alt={text}
        />
        <img
          width={width}
          height={height}
          className="bliz-btn-hover"
          src={blizBtnHover.src}
          alt={text}
        />
        <img
          width={width}
          height={height}
          className="bliz-btn-active"
          src={blizBtnActive.src}
          alt={text}
        />
      </picture>

      <div
        css={css`
          height: ${height}px;
          width: ${width}px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          position: relative;
        `}
      >
        <span
          css={css`
            color: #fdd400;
            text-shadow: 2px 2px 2px black;
          `}
        >
          {loading ? "Please Wait" : text}
        </span>
        {loading && <CircularProgress size={20} sx={{ marginLeft: 1 }} />}
      </div>
    </button>
  );
};

export default BlizzardButton;
