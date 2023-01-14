/* eslint-disable jsx-a11y/anchor-is-valid */
import { css } from "@emotion/react";
import Link from "next/link";
import { useRouter } from "next/router";
import colors from "../styles/colors";
import vars from "../styles/vars";

interface IRouteProps {
  text?: string;
  to: string;
  children?: React.ReactNode;
  className?: string;
  ssr?: boolean;
}

const activeStyle = css`
  color: ${colors.link.active};
  font-weight: ${vars.font.standard.weights.bold};
`;

const Route: React.FC<IRouteProps> = ({ text, to, children, className, ssr = false }) => {
  const router = useRouter();
  const isMatch = router.asPath === to;

  if (!ssr && to?.startsWith("/")) {
    return (
      <Link href={to}>
        <a className={className} css={isMatch && activeStyle} data-match={isMatch}>
          {children}
          {text}
        </a>
      </Link>
    );
  }

  return (
    <a className={className} css={isMatch && activeStyle} href={to}>
      {children}
      {text}
    </a>
  );
};

export default Route;
