import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react';

import UserProvider from '../src/providers/user-provider';
import Layout from '../src/components/layout';
import theme from '../src/theme';

import '../style.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <UserProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserProvider>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
