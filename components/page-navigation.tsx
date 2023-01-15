import { Button, css, Menu, MenuItem } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import { useRouter } from "next/router";
import Route from "./route";
import media from "../styles/media-queries";
import ndyIcon from "../public/assets/ndy-icon.png";
import { getUsername } from "../utils";
import colors from "../styles/colors";

const PageNavigation: React.FC = () => {
  const { data: session } = useSession();
  const username = getUsername(session);
  const member = session?.user?.member;
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav
      css={css`
        background-color: ${colors.blue.darkest};
      `}
    >
      <ul
        css={css`
          max-width: 900px;
          margin: auto;
          list-style-type: none;
          color: ${colors.white};
          display: flex;
          align-items: stretch;
          text-transform: uppercase;
          min-height: 40px;
          padding: 0 20px;

          ${media.down("xs")`
            padding: 0 6px 0 0;
          `};

          li {
            user-select: none;
          }

          a {
            height: 100%;
            display: flex;
            align-items: center;
            padding: 0 8px;

            ${media.down("xs")`
              font-size: 0.85rem;              
              padding: 0 10px;
            `};
          }

          span {
            margin-left: 8px;

            ${media.down("sm")`
              font-size: 0.75rem;
            `};

            @media (max-width: 450px) {
              display: none;
            }
          }

          li:not(:last-of-type) {
            ${media.up("md")`
              margin-right: 20px;
            `};

            ${media.down("sm")`
              margin-right: 0;
            `};
          }
        `}
      >
        <li className="logo">
          <Route to="/">
            <Image src={ndyIcon} alt="Home" placeholder="blur" width="20" height="26" />
            <span>Home</span>
          </Route>
        </li>

        {member ? (
          <li>
            <Route to="/dashboard">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M13 9V3h8v6ZM3 13V3h8v10Zm10 8V11h8v10ZM3 21v-6h8v6Z"
                />
              </svg>
              <span>Dashboard</span>
            </Route>
          </li>
        ) : (
          <>
            <li>
              <Route to="/news">
                <svg width="20" height="20" viewBox="0 0 512 512">
                  <rect
                    width="96"
                    height="96"
                    x="96"
                    y="112"
                    fill="none"
                    rx="16"
                    ry="16"
                  />
                  <path
                    fill="currentColor"
                    d="M468 112h-52v304a32 32 0 0 0 32 32a32 32 0 0 0 32-32V124a12 12 0 0 0-12-12Z"
                  />
                  <path
                    fill="currentColor"
                    d="M431.15 477.75A64.11 64.11 0 0 1 384 416V44a12 12 0 0 0-12-12H44a12 12 0 0 0-12 12v380a56 56 0 0 0 56 56h342.85a1.14 1.14 0 0 0 .3-2.25ZM96 208v-96h96v96Zm224 192H96v-32h224Zm0-64H96v-32h224Zm0-64H96v-32h224Zm0-64h-96v-32h96Zm0-64h-96v-32h96Z"
                  />
                </svg>
                <span>News</span>
              </Route>
            </li>
            <li>
              <Route to="/rules">
                <svg width="20" height="20" viewBox="0 0 48 48">
                  <mask id="ipSAgreement0">
                    <g fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="4">
                      <rect
                        width="32"
                        height="40"
                        x="8"
                        y="4"
                        strokeLinejoin="round"
                        rx="2"
                      />
                      <path
                        fill="#fff"
                        strokeLinejoin="round"
                        d="M16 4h9v16l-4.5-4l-4.5 4V4Z"
                      />
                      <path d="M16 28h10m-10 6h16" />
                    </g>
                  </mask>
                  <path
                    fill="currentColor"
                    d="M0 0h48v48H0z"
                    mask="url(#ipSAgreement0)"
                  />
                </svg>
                <span>Rules</span>
              </Route>
            </li>
            <li>
              <Route to="/apply">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 28 28"
                >
                  <path
                    fill="currentColor"
                    d="M18.081 13.399A4.48 4.48 0 0 0 18.5 11.5c0-.526-.09-1.03-.256-1.5h6.006c.966 0 1.75.784 1.75 1.75v2.002l-.008.108a3.32 3.32 0 0 1-.38 1.152A7.474 7.474 0 0 0 20.5 13c-.846 0-1.66.14-2.419.399Zm-4.656 9.596c-2.812-.13-4.52-1.141-4.91-3.098L8.5 19.75v-2c0-.966.784-1.75 1.75-1.75h4.25a7.466 7.466 0 0 0-1.5 4.5c0 .875.15 1.714.425 2.495ZM9.756 10H3.75A1.75 1.75 0 0 0 2 11.75v2l.014.147c.42 2.101 2.36 3.112 5.553 3.112H7.6A2.751 2.751 0 0 1 10.25 15h.922l-.176-.15A4.489 4.489 0 0 1 9.5 11.5c0-.526.09-1.03.256-1.5Zm7.744 1.5a3.5 3.5 0 1 0-7 0a3.5 3.5 0 0 0 7 0Zm6.5-6a3.5 3.5 0 1 0-7 0a3.5 3.5 0 0 0 7 0Zm-13 0a3.5 3.5 0 1 0-7 0a3.5 3.5 0 0 0 7 0ZM20.5 27a6.5 6.5 0 1 0 0-13a6.5 6.5 0 0 0 0 13Zm0-11a.5.5 0 0 1 .5.5V20h3.5a.5.5 0 0 1 0 1H21v3.5a.5.5 0 0 1-1 0V21h-3.5a.5.5 0 0 1 0-1H20v-3.5a.5.5 0 0 1 .5-.5Z"
                  />
                </svg>
                <span>Apply</span>
              </Route>
            </li>
          </>
        )}

        <li>
          <Route to={process.env.NEXT_PUBLIC_DISCORD_URL || ""}>
            <FontAwesomeIcon
              id="discordLogo"
              height="20"
              width="20"
              style={{ minHeight: "20px" }}
              title="Discord"
              icon={faDiscord}
            />
            <span>Discord</span>
          </Route>
        </li>

        {username && (
          <li
            css={css`
              margin-left: auto;
            `}
          >
            <Button
              id="userMenuBtn"
              aria-controls={open ? "userMenu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              endIcon={<KeyboardArrowDownIcon />}
            >
              {username}
            </Button>
            <Menu
              id="userMenu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "userMenuBtn",
              }}
            >
              <MenuItem onClick={() => signOut()}>Sign Out</MenuItem>
              {session?.user?.admin && (
                <MenuItem
                  onClick={async () => {
                    await router.push("/admin");
                    handleClose();
                  }}
                >
                  Admin
                </MenuItem>
              )}
            </Menu>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default PageNavigation;
