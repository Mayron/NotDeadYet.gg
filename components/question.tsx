import { css } from "@emotion/react";
import styled from "@emotion/styled";

interface IQuestionProps {
  horizontal?: boolean;
}

const Question = styled.div<IQuestionProps>(
  ({ horizontal }) => css`
    padding: 15px 0;

    ${horizontal
      ? css`
          display: flex;
          align-items: center;

          .MuiTextField-root {
            margin-bottom: 12px;
          }
        `
      : css`
          .MuiFormControl-root {
            margin-top: 6px;
          }
        `};

    & > * {
      ${horizontal
        ? css`
            padding-right: 20px;
          `
        : css`
            padding-bottom: 10px;
          `};
    }

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  `,
);

export default Question;
