import type { AppProps } from 'next/app';
import { NextSeo } from 'next-seo';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react';

import UserProvider from '../src/providers/user-provider';
import Layout from '../src/components/layout';
import theme from '../src/theme';

import '../style.css';

const queryClient = new QueryClient();

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <SessionProvider session={session}>
        <ChakraProvider theme={theme}>
          <NextSeo
            title="unwrapit.me - your music history unwrapped."
            description="Have you ever wanted to see your most listened artists and tracks anytime of the year? with unwrapit.me you can!"
            openGraph={{
              url: 'https://unwrapit.vercel.app',
              title: 'unwrapit',
              description:
                'Have you ever wanted to see your most listened artists and tracks anytime of the year? with unwrapit.me you can!',
              locale: 'en_US',
              images: [
                {
                  url: 'https://unwrapit.vercel.app/assets/images/social.png',
                  width: 1200,
                  height: 630,
                  alt: 'unwrapit',
                  type: 'image/png',
                },
              ],
            }}
          />
          <UserProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </UserProvider>
        </ChakraProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}

export default App;

