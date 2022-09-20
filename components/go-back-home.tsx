import { css } from "@emotion/react";
import BackButton from "../svgs/back-button.svg";
import Route from "./route";

const GoBackHome: React.FC = () => (
  // eslint-disable-next-line react/jsx-no-undef
  <Route
    to="/"
    text="Go Back to Home Page"
    css={css`
      display: flex;
      align-items: center;
      font-weight: 500;
      font-size: 1.2rem;
      margin-bottom: 20px;

      &:hover {
        circle {
          fill: #268bff;
        }
      }

      svg {
        margin-right: 10px;
      }
    `}
  >
    <BackButton />
  </Route>
);

export default GoBackHome;
