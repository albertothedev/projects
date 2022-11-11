import React from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import "sanitize.css";
import "sanitize.css/forms.css";
import "sanitize.css/assets.css";
import "sanitize.css/typography.css";
import "sanitize.css/reduce-motion.css";

import "styles/main.scss";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEnvelopeSquare,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
library.add(faLinkedin, faGithub, faEnvelopeSquare, faTimesCircle);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Alberto Vilches</title>
      </Head>
      <React.StrictMode>
        <Component {...pageProps} />
      </React.StrictMode>
    </>
  );
}

export default MyApp;
