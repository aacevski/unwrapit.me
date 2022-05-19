import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

const Doc = () => (
  <Html lang="en">
    <Head>
      <script async src="https://cdn.splitbee.io/sb.js"></script>
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Doc;
