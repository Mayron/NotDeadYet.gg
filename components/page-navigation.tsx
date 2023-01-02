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
        <li className="md-up">
          <Route to="/" text="Home" />
        </li>

        <li className="logo sm-down">
          <Route to="/">
            <Image src={ndyIcon} alt="Home" placeholder="blur" width={20} height={26} />
          </Route>
        </li>

        <li>
          <Route to="/news" text="News" />
        </li>
        <li>
          <Route to="/rules" text="Rules" />
        </li>
        <li>
          {member ? (
            <a href={`${process.env.NEXT_PUBLIC_WEBSITE_URL || ""}/dashboard`}>
              Dashboard
            </a>
          ) : (
            <a href={`${process.env.NEXT_PUBLIC_WEBSITE_URL || ""}/apply`}>Apply</a>
          )}
        </li>
        <li
          css={css`
            svg {
              margin-right: 8px;
            }
          `}
        >
          <Route to={process.env.NEXT_PUBLIC_DISCORD_URL || ""}>
            <FontAwesomeIcon title="Discord" icon={faDiscord} />
            <span className="sm-up">Discord</span>
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
