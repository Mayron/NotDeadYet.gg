/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import { Global } from "@emotion/react";
import type { AppProps } from "next/app";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { SessionProvider } from "next-auth/react";
import globalStyles from "../styles/globals";
import { getMediaQueryCssClasses } from "../styles/media-queries";

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => (
  <>
    <Global styles={[globalStyles, getMediaQueryCssClasses()]} />
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  </>
);

export default MyApp;
