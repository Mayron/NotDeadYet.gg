import { css } from "@emotion/react";
import { useRouter } from "next/router";
import BackButton from "../svgs/back-button.svg";
import Route from "./route";

interface IGoBackButtonProps {
  text: string;
  to?: string;
}

const styledSvg = css`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 1.2rem;

  &:hover {
    color: #268bff;
    circle {
      fill: #268bff;
    }
  }

  svg {
    margin-right: 10px;
  }
`;

const GoBackButton: React.FC<IGoBackButtonProps> = ({ text, to }) => {
  const router = useRouter();

  if (!to) {
    return (
      <button type="button" onClick={router.back} css={styledSvg}>
        <BackButton />
        {text}
      </button>
    );
  }
  return (
    // eslint-disable-next-line react/jsx-no-undef
    <Route to={to} text={text} css={styledSvg}>
      <BackButton />
    </Route>
  );
};

export default GoBackButton;
