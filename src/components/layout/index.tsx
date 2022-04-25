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
      bgColor="hsla(0,100%,50%,1)"
      bgImage="radial-gradient(at 40% 20%, hsla(28,100%,74%,1) 0px, transparent 50%),
     radial-gradient(at 80% 0%, hsla(189,100%,56%,1) 0px, transparent 50%),
     radial-gradient(at 0% 50%, hsla(355,100%,93%,1) 0px, transparent 50%),
     radial-gradient(at 80% 50%, hsla(340,100%,76%,1) 0px, transparent 50%),
     radial-gradient(at 0% 100%, hsla(22,100%,77%,1) 0px, transparent 50%),
     radial-gradient(at 80% 100%, hsla(242,100%,70%,1) 0px, transparent 50%),
     radial-gradient(at 0% 0%, hsla(343,100%,76%,1) 0px, transparent 50%)"
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
