/* eslint-disable react/jsx-props-no-spreading */
import { Global } from "@emotion/react";
import type { AppProps } from "next/app";
import "@fortawesome/fontawesome-svg-core/styles.css";
import globalStyles from "../styles/globals";
import { getMediaQueryCssClasses } from "../styles/media-queries";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Global styles={[globalStyles, getMediaQueryCssClasses()]} />
    <Component {...pageProps} />
  </>
);

export default MyApp;
