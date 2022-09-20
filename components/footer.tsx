import { css } from "@emotion/react";
import colors from "../styles/colors";
import Route from "./route";

const Footer: React.FC = () => (
  <footer
    css={css`
      background-color: ${colors.blue.darkest};
      color: ${colors.white};
      padding: 30px;
      text-align: center;

      ul {
        list-style-type: none;
        margin-top: 20px;
      }
    `}
  >
    <p>
      &copy; {new Date().getFullYear()}{" "}
      <a className="text" href="https://wwww.not-dead-yet.com">
        Not-Dead-Yet.com
      </a>
      , All rights reserved.
    </p>
    <ul>
      <li>
        <Route to="/terms-and-conditions" text="Terms and Conditions" />
      </li>
      <li>
        <Route to="/terms-and-conditions" text="Privacy Policy" />
      </li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </footer>
);

export default Footer;
