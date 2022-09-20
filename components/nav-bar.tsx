import { css } from "@emotion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import colors from "../styles/colors";
import Route from "./route";
import vars from "../styles/vars";

const NavBar: React.FC = () => (
  <nav
    css={css`
      background-color: rgba(0, 0, 0, 0.5);
      color: ${colors.white};
      height: 70px;
      max-width: 1000px;
      margin: 0 auto;
      width: 100%;
      mask-image: linear-gradient(
        to right,
        transparent 0,
        black 20%,
        black 80%,
        transparent 100%
      );
    `}
  >
    <ul
      className="no-markers"
      css={css`
        display: flex;
        justify-content: center;
        padding: 0 30px;
        text-transform: uppercase;
        font-size: 1.125rem;
        height: 100%;
        border-top: 1px solid ${colors.link.hover};
        border-bottom: 1px solid ${colors.link.hover};
        box-shadow: 0 0px 6px black;

        svg {
          margin-right: 8px;
        }

        a {
          display: flex;
          align-items: center;
          height: 100%;
          padding: 0 30px;
          font-family: ${vars.font.header.family};
          font-size: 1.25rem;
        }
      `}
    >
      <li>
        <Route text="About Us" to="/about-us" />
      </li>
      <li>
        <Route text="Rules" to="/rules" />
      </li>
      <li>
        <Route text="Join Us" to="/join-us" />
      </li>
      <li>
        <Route text="Discord" to="/discord">
          <FontAwesomeIcon title="Discord" icon={faDiscord} />
        </Route>
      </li>
    </ul>
  </nav>
);

export default NavBar;
