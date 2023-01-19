import { css, Global } from "@emotion/react";
import styled from "@emotion/styled";
import colors from "../styles/colors";
import media from "../styles/media-queries";
import DashboardBottomNavMenu from "./dashboard-bottom-nav-menu";
import DashboardSideNavMenu from "./dashboard-side-nav-menu";
import PostThumbnail from "./post-thumbnail";

const StyledDashboardLayout = styled.section<{ fullscreen: boolean }>(
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

export const DashboardContainer = styled.div`
  display: flex;
  position: relative;
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

interface IDashboardLayoutProps {
  id: string;
  header?: string;
  fullscreen?: boolean;
  children: React.ReactNode | React.ReactNode[];
  toolbar?: React.ReactElement;
  contentPadding?: boolean;
}

const DashboardLayout: React.FC<IDashboardLayoutProps> = ({
  id,
  header,
  fullscreen,
  children,
  toolbar,
  contentPadding = true,
}) => (
  <StyledDashboardLayout fullscreen={fullscreen || false}>
    {header && <DashboardHeader title={header} />}
    <DashboardContainer>
      <DashboardSideNavMenu />
      <div
        css={css`
          background-color: #f6faff;
          min-height: 100%;
          position: relative;
          flex: 1;
        `}
      >
        {toolbar}
        <article
          css={[
            css`
              padding: 0;
            `,
            contentPadding &&
              css`
                padding: 15px;
                ${media.down("sm")`padding: 10px;`};
              `,
          ]}
        >
          {children}
        </article>
      </div>
    </DashboardContainer>
    <DashboardBottomNavMenu id={id} />
  </StyledDashboardLayout>
);

export default DashboardLayout;
