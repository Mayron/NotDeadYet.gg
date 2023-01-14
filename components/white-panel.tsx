import { css } from "@emotion/react";
import styled from "@emotion/styled";
import colors from "../styles/colors";
import { contentfulStyles } from "../styles/fonts";
import media from "../styles/media-queries";

interface IWhitePanelProps {
  headerBorder?: boolean;
}

const WhitePanel = styled.article<IWhitePanelProps>(
  ({ headerBorder = true }) => css`
    ${contentfulStyles};
    overflow-wrap: anywhere;
    background-color: ${colors.white};
    border-radius: 2px;
    border: 1px solid #cfcfcf;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
    padding: 30px;
    margin-bottom: 15px;
    font-size: 0.9rem;

    ${media.down("sm")`
      padding: 10px;
      margin-bottom: 10px;
      position: relative;
      left: -5px;
      width: calc(100% + 12px);
    `};

    & > header {
      padding: 0 0 ${headerBorder ? "15px" : "0"} 0;

      &:not(:first-child) {
        padding-top: 20px;
      }

      h2,
      h3,
      p {
        text-align: center;
      }

      p {
        padding-bottom: 15px;
        border-bottom: ${headerBorder ? "1px solid #cfcfcf" : "none"};
      }
    }
  `,
);

export default WhitePanel;
