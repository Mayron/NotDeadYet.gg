/* eslint-disable jsx-a11y/anchor-is-valid */
import { css } from "@emotion/react";
import Link from "next/link";
import { useRouter } from "next/router";
import colors from "../styles/colors";

interface IRouteProps {
  text?: string;
  to: string;
  children?: React.ReactNode;
  className?: string;
}

const activeStyle = css`
  color: ${colors.link.active};
`;

const Route: React.FC<IRouteProps> = ({ text, to, children, className }) => {
  const router = useRouter();

  return (
    <Link href={to}>
      <a className={className} css={router.pathname === to && activeStyle}>
        {children}
        {text}
      </a>
    </Link>
  );
};

export default Route;
