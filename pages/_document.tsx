import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

const Doc = () => (
  <Html lang="en">
    <Head>
      <script
        defer
        data-domain="unwrapit.vercel.app"
        src="https://plausible.io/js/plausible.js"
      ></script>
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Doc;
