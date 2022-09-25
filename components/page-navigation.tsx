import { Button, css, Menu, MenuItem } from "@mui/material";
import { signOut } from "next-auth/react";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import Route from "./route";

interface IPageNavigationProps {
  username: string;
}

const PageNavigation: React.FC<IPageNavigationProps> = ({ username }) => {
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

          li {
            user-select: none;
          }

          a {
            height: 100%;
            display: flex;
            align-items: center;
            padding: 0 8px;
          }

          li:not(:last-of-type) {
            margin-right: 20px;
          }
        `}
      >
        <li>
          <Route to="/" text="Home" />
        </li>
        <li>
          <Route to="/news" text="News" />
        </li>
        <li>
          <Route to="/rules" text="Rules" />
        </li>
        <li
          css={css`
            svg {
              margin-right: 8px;
            }
          `}
        >
          <Route to="/discord" text="Discord">
            <FontAwesomeIcon title="Discord" icon={faDiscord} />
          </Route>
        </li>
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
      </ul>
    </nav>
  );
};

export default PageNavigation;
