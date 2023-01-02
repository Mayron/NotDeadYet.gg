import { css } from "@emotion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { useSession } from "next-auth/react";
import colors from "../styles/colors";
import Route from "./route";
import vars from "../styles/vars";
import media from "../styles/media-queries";

const NavBar: React.FC = () => {
  const { data: session } = useSession();
  const member = session?.user?.member;

  return (
    <nav
      css={css`
        background-color: rgba(0, 0, 0, 0.5);
        color: ${colors.white};
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

        ${media.up("sm")`
        height: 70px;
      `};
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

          li {
            padding-bottom: 0;
          }

          a {
            display: flex;
            align-items: center;
            height: 100%;
            font-family: ${vars.font.header.family};
            font-size: 1.25rem;

            ${media.up("sm")`
            padding: 0 30px;
          `};

            ${media.down("xs")`
            padding: 15px;
            justify-content: center;
        `};
          }

          ${media.down("xs")`
          flex-direction: column;
          align-items: center;
          padding: 10px 0;

          li {
            width: 100%;
          }
        `};
        `}
      >
        <li>
          <Route text="News" to="/news" />
        </li>
        <li>
          <Route text="Rules" to="/rules" />
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
        <li>
          <Route to={process.env.NEXT_PUBLIC_DISCORD_URL || ""} text="Discord">
            <FontAwesomeIcon title="Discord" icon={faDiscord} />
          </Route>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
