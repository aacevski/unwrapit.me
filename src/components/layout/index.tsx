import { PropsWithChildren } from 'react';
import { VStack, Container } from '@chakra-ui/react';
import Header from './header';

type Props = PropsWithChildren<{}>;

const Layout = ({ children }: Props) => {
  return (
    <Container
      display="flex"
      maxW="full"
      minH={{ base: 'auto', md: '100vh' }}
      px={0}
      centerContent
    >
      <Header />
      <VStack flex={1} spacing={16} alignItems="stretch" w="full">
        <VStack spacing={16} flex={1} w="full" as="main">
          {children}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Layout;
