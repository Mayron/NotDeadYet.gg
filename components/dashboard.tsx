import { css } from "@emotion/react";
import styled from "@emotion/styled";
import colors from "../styles/colors";
import media from "../styles/media-queries";

interface IDashboardMainSectionProps {
  fullscreen?: boolean;
}

export const DashboardMainSection = styled.section<IDashboardMainSectionProps>(
  ({ fullscreen }) => css`
    max-width: ${fullscreen ? "100%" : "1140px"};
    width: 100%;
    padding-top: 30px;
    flex: 1;
    display: flex;
    flex-direction: column;

    ${media.down("sm")`
      padding: 0;

      & > header {
        display: none;
      }
    `};

    ${fullscreen &&
    css`
      padding: 0;

      & > header {
        display: ${fullscreen ? "none" : "block"};
      }
    `};
  `,
);

export const DashboardHeader: React.FC<{ title: string }> = ({ title }) => (
  <header>
    <h1
      css={css`
        font-size: 1.7rem;
        margin-bottom: 10px;
      `}
    >
      {title}
    </h1>
  </header>
);

interface IDashboardContentPanelProps {
  children: React.ReactNode | React.ReactNode[];
  full?: boolean;
}

export const DashboardContentPanel: React.FC<IDashboardContentPanelProps> = ({
  children,
  full,
}) => (
  <div
    css={css`
      flex: 1;
      padding: 15px 0;
      background-color: #f6faff;
      min-height: 100%;
      position: relative;

      ${full &&
      css`
        margin-top: 0;
        padding: 0;
      `};
    `}
  >
    {children}
  </div>
);

export const DashboardContainer = styled.div`
  display: flex;
  flex: 1;
  background-color: ${colors.white};
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;

  ${media.down("sm")`
    flex-direction: column;
    min-height: 100%;
  `};
`;
