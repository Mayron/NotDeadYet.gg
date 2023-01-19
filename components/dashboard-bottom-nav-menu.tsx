import { css, Global } from "@emotion/react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useSession } from "next-auth/react";
import media from "../styles/media-queries";

const DashboardBottomNavMenu: React.FC<{ id: string }> = ({ id }) => {
  const { data: session } = useSession();

  return (
    <BottomNavigation
      showLabels
      value={id}
      className="sm-down"
      css={css`
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        border-top: 1px solid #dbe5f1;

        ${session?.user.admin &&
        css`
          @media all and (max-width: 380px) {
            .MuiButtonBase-root {
              min-width: 74px;
              padding: 0 8px;
            }
          }
        `};
      `}
    >
      <Global styles={media.down("sm")`body { margin-bottom: 56px;}`} />
      <BottomNavigationAction
        label="News"
        value="News"
        href="/dashboard"
        icon={
          <svg width="20" height="20" viewBox="0 0 512 512">
            <rect width="96" height="96" x="96" y="112" fill="none" rx="16" ry="16" />
            <path
              fill="currentColor"
              d="M468 112h-52v304a32 32 0 0 0 32 32a32 32 0 0 0 32-32V124a12 12 0 0 0-12-12Z"
            />
            <path
              fill="currentColor"
              d="M431.15 477.75A64.11 64.11 0 0 1 384 416V44a12 12 0 0 0-12-12H44a12 12 0 0 0-12 12v380a56 56 0 0 0 56 56h342.85a1.14 1.14 0 0 0 .3-2.25ZM96 208v-96h96v96Zm224 192H96v-32h224Zm0-64H96v-32h224Zm0-64H96v-32h224Zm0-64h-96v-32h96Zm0-64h-96v-32h96Z"
            />
          </svg>
        }
      />
      <BottomNavigationAction
        label="Loot"
        value="Loot"
        href="/dashboard/loot"
        icon={
          <svg width="20" height="20" viewBox="0 0 24 24">
            <g
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <path d="M6 3h12l4 6l-10 13L2 9z" />
              <path d="m12 22l4-13l-3-6m-1 19L8 9l3-6M2 9h20" />
            </g>
          </svg>
        }
      />
      <BottomNavigationAction
        label="Rules"
        value="Rules"
        href="/rules"
        icon={
          <svg width="20" height="20" viewBox="0 0 48 48">
            <mask id="rulesBottomMask">
              <g fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="4">
                <rect width="32" height="40" x="8" y="4" strokeLinejoin="round" rx="2" />
                <path
                  fill="#fff"
                  strokeLinejoin="round"
                  d="M16 4h9v16l-4.5-4l-4.5 4V4Z"
                />
                <path d="M16 28h10m-10 6h16" />
              </g>
            </mask>
            <path fill="currentColor" d="M0 0h48v48H0z" mask="url(#rulesBottomMask)" />
          </svg>
        }
      />
      <BottomNavigationAction
        label="Resources"
        value="Resources"
        href="/dashboard/resources"
        icon={
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              d="m12 3l9 4.5l-9 4.5l-9-4.5L12 3Zm4.5 7.25L21 12.5L12 17l-9-4.5l4.5-2.25m9 5L21 17.5L12 22l-9-4.5l4.5-2.25"
            />
          </svg>
        }
      />
      {session?.user.admin && (
        <BottomNavigationAction
          label="Admin"
          value="Admin"
          href="/admin"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M17 11c.34 0 .67.04 1 .09V6.27L10.5 3L3 6.27v4.91c0 4.54 3.2 8.79 7.5 9.82c.55-.13 1.08-.32 1.6-.55c-.69-.98-1.1-2.17-1.1-3.45c0-3.31 2.69-6 6-6z"
              />
              <path
                fill="currentColor"
                d="M17 13c-2.21 0-4 1.79-4 4s1.79 4 4 4s4-1.79 4-4s-1.79-4-4-4zm0 1.38c.62 0 1.12.51 1.12 1.12s-.51 1.12-1.12 1.12s-1.12-.51-1.12-1.12s.5-1.12 1.12-1.12zm0 5.37c-.93 0-1.74-.46-2.24-1.17c.05-.72 1.51-1.08 2.24-1.08s2.19.36 2.24 1.08c-.5.71-1.31 1.17-2.24 1.17z"
              />
            </svg>
          }
        />
      )}
    </BottomNavigation>
  );
};

export default DashboardBottomNavMenu;
