import {
  HStack,
  Heading,
  Link,
  useColorModeValue,
  Container,
} from '@chakra-ui/react';
import NextLink from 'next/link';

import ColorModeSwitch from '../color-mode-switch';

const Header = () => {
  return (
    <HStack
      as="nav"
      top={0}
      insetX={0}
      zIndex="popover"
      justifyContent="space-between"
      alignItems="center"
      w="full"
      py={3}
      bg={useColorModeValue('white', 'black')}
      transitionProperty="background"
      transitionDuration="normal"
      mb={16}
    >
      <Container
        display="flex"
        maxW="container.md"
        alignItems="center"
        justifyContent="space-between"
        px={{ base: 4, lg: 0 }}
      >
        <NextLink href="/" passHref>
          <Link>
            <Heading size="sm">unwrapped.me</Heading>
          </Link>
        </NextLink>
        <ColorModeSwitch size="md" />
      </Container>
    </HStack>
  );
};

export default Header;
