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
        margin-top: 10px;
        width: 100%;

        @media all and (max-width: 879px) and (min-width: 675px) {
          mask-image: linear-gradient(
            to right,
            transparent 0,
            black 10%,
            black 90%,
            transparent 100%
          );

          a {
            padding: 20px 30px;
          }
        }

        @media all and (min-width: 880px) {
          mask-image: linear-gradient(
            to right,
            transparent 0,
            black 20%,
            black 80%,
            transparent 100%
          );

          a {
            padding: 20px 30px;
          }
        }
      `}
    >
      <ul
        className="no-markers text-lg"
        css={css`
          display: flex;
          justify-content: center;
          padding: 0 30px;
          text-transform: uppercase;
          height: 100%;
          border-top: 1px solid ${colors.link.hover};
          border-bottom: 1px solid ${colors.link.hover};
          box-shadow: 0 0px 6px black;

          ${media.down("xs")`
            padding-left: 10px;
            padding-right: 10px;
          `};

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

            @media all and (max-width: 879px) {
              padding: 15px 20px;
              justify-content: center;
              font-size: 1.1rem;
            }

            @media all and (max-width: 440px) {
              padding: 15px 10px;
              font-size: 0.96rem;

              svg {
                margin-right: 4px;
                height: 15px;
              }
            }
          }
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
