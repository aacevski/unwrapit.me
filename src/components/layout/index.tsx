import { PropsWithChildren } from 'react';
import { VStack, Container } from '@chakra-ui/react';

import Header from './header';

type Props = PropsWithChildren<{}>;

const Layout = ({ children }: Props) => {
  return (
    <Container
      display="flex"
      maxW="full"
      minH="100vh"
      px={0}
      centerContent
      position="relative"
    >
      <Header />
      <VStack flex={1} spacing={16} alignItems="stretch" w="full">
        <VStack
          spacing={16}
          flex={1}
          w="full"
          as="main"
          pl={{ base: 0, lg: '240px' }}
          pb={16}
        >
          {children}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Layout;
