import { css } from "@emotion/react";
import colors from "../styles/colors";
import media from "../styles/media-queries";
import Route from "./route";

const Footer: React.FC = () => (
  <footer
    css={css`
      background-color: ${colors.blue.dark};
      color: ${colors.white};
      padding: 30px;
      text-align: center;

      ${media.down("sm")`padding: 15px 5px; font-size: 0.85rem;`};

      ul {
        list-style-type: none;
        margin-top: 20px;
        margin-left: 0;
      }
    `}
  >
    <p>
      &copy; {new Date().getFullYear()}{" "}
      <a className="text" href={process.env.NEXT_PUBLIC_WEBSITE_URL}>
        {process.env.NEXT_PUBLIC_WEBSITE_NAME}
      </a>
      , All rights reserved.
    </p>
    <ul>
      <li>
        <Route to="/terms-and-conditions" text="Terms and Conditions" />
      </li>
      <li>
        <Route to="/privacy-policy" text="Privacy Policy" />
      </li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </footer>
);

export default Footer;
