import { Button, css, Menu, MenuItem } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import Route from "./route";
import media, { breakpoints, useBreakpoint } from "../styles/media-queries";
import ndyIcon from "../public/assets/ndy-icon.png";

const PageNavigation: React.FC = () => {
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const breakpoint = useBreakpoint();

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let username = session?.user?.name;

  if (username) {
    username = username.split("#")[0];
  }

  return (
    <nav
      css={css`
        background-color: #15181d;
      `}
    >
      <ul
        css={css`
          max-width: 900px;
          margin: auto;
          list-style-type: none;
          color: white;
          display: flex;
          align-items: stretch;
          text-transform: uppercase;
          min-height: 40px;
          padding: 0 20px;

          ${media.down("xs")`
            padding: 0 6px;
          `};

          li {
            user-select: none;

            &.logo {
              margin-right: 0 !important;

              a {
                min-width: 36px;
              }
            }
          }

          a {
            height: 100%;
            display: flex;
            align-items: center;
            padding: 0 8px;

            ${media.down("xs")`
              font-size: 0.85rem;
            `};
          }

          li:not(:last-of-type) {
            ${media.up("sm")`
              margin-right: 20px;
            `};

            ${media.down("xs")`
              margin-right: 8px;
            `};
          }
        `}
      >
        {breakpoint > breakpoints.sm ? (
          <li>
            <Route to="/" text="Home" />
          </li>
        ) : (
          <li className="logo">
            <Route to="/">
              <Image src={ndyIcon} alt="Home" placeholder="blur" width={20} height={26} />
            </Route>
          </li>
        )}

        <li>
          <Route to="/news" text="News" />
        </li>
        <li>
          <Route to="/rules" text="Rules" />
        </li>
        <li>
          <a href={`${process.env.NEXT_PUBLIC_WEBSITE_URL || ""}/apply`}>Apply</a>
        </li>
        <li
          css={css`
            svg {
              margin-right: 8px;
            }
          `}
        >
          <Route
            to={process.env.NEXT_PUBLIC_DISCORD_URL || ""}
            text={breakpoint > breakpoints.sm ? "Discord" : undefined}
          >
            <FontAwesomeIcon title="Discord" icon={faDiscord} />
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
            </Menu>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default PageNavigation;
