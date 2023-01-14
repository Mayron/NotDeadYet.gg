import { css } from "@emotion/react";
import styled from "@emotion/styled";
import media from "../styles/media-queries";
import vars from "../styles/vars";

interface IQuestionProps {
  horizontal?: boolean;
}

const Question = styled.div<IQuestionProps>(
  ({ horizontal }) => css`
    padding: 15px 0;

    ${horizontal
      ? css`
          ${media.up("sm")`
            display: flex;
            align-items: center;

            p:first-child {
              padding-right: 20px;
              padding-bottom: 0;
            }

            p.Mui-error {
              padding-left: 10px;
            }

            .MuiInput-underline {
              margin-bottom: 12px;
            }
          `};

          ${media.down("xs")`
            p:first-child {
              padding-bottom: 10px;
              
            }
          `};
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

    & > p {
      font-weight: ${vars.font.standard.weights.medium};
    }

    ul,
    li {
      font-weight: ${vars.font.standard.weights.regular};
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
