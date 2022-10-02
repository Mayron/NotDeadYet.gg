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

          p:first-child {
            padding-right: 20px;
          }

          p.Mui-error {
            padding-left: 10px;
          }

          .MuiTextField-root {
            margin-bottom: 12px;
          }
        `
      : css`
          p:first-child {
            padding-bottom: 10px;
          }
        `};

    .MuiFormHelperText-root {
      margin-top: 0 !important;
    }

    .MuiFormControl-fullWidth {
      margin-top: 10px;
    }

    &:first-child {
      margin-top: 0;
      padding-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
      padding-bottom: 0;
    }
  `,
);

export default Question;
