import {
  HStack,
  Heading,
  Link,
  useColorModeValue,
  Container,
  IconButton,
  useColorMode,
  Icon,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { IoSunnySharp, IoMoon } from 'react-icons/io5';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

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
        <IconButton
          variant="ghost"
          aria-label="Color mode switch"
          rounded="full"
          _hover={{
            bg: useColorModeValue('#F2F2F2', '#383A3E'),
            rounded: 'full',
          }}
          size="md"
          onClick={toggleColorMode}
          icon={
            colorMode === 'light' ? (
              <Icon as={IoMoon} />
            ) : (
              <Icon as={IoSunnySharp} />
            )
          }
        />
      </Container>
    </HStack>
  );
};

export default Header;
