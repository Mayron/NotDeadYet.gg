import { css } from "@emotion/react";
import styled from "@emotion/styled";
import colors from "../styles/colors";
import media from "../styles/media-queries";

interface IWhitePanelProps {
  headerBorder?: boolean;
}

const WhitePanel = styled.div<IWhitePanelProps>(
  ({ headerBorder = true }) => css`
    overflow-wrap: anywhere;
    background-color: ${colors.white};
    padding: 25px;
    border: 1px solid #cfcfcf;
    border-radius: 4px;
    box-shadow: 0px 4px 10px rgb(0 0 0 / 20%);
    margin-bottom: 30px;

    ${media.down("sm")`
      padding: 10px;
      margin-bottom: 10px;
      position: relative;
      left: -5px;
      width: calc(100% + 12px);
    `};

    & > header {
      padding: 10px 0 15px 0;
      text-align: center;

      p {
        margin: 0 15px;
        padding-bottom: 15px;
        border-bottom: ${headerBorder ? "1px solid #cfcfcf" : "none"};
      }
    }
  `,
);

export default WhitePanel;
