import { css } from "@emotion/react";
import BackButton from "../svgs/back-button.svg";
import Route from "./route";

interface IGoBackButtonProps {
  text: string;
  to: string;
}

const GoBackButton: React.FC<IGoBackButtonProps> = ({ text, to }) => (
  // eslint-disable-next-line react/jsx-no-undef
  <Route
    to={to}
    text={text}
    css={css`
      display: flex;
      align-items: center;
      font-weight: 500;
      font-size: 1.2rem;

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

export default GoBackButton;
