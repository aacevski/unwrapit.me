import { useContext } from 'react';
import {
  HStack,
  Heading,
  Link,
  Container,
  Button,
  VStack,
  Divider,
  Box,
  Icon,
  useMediaQuery,
  IconButton,
  Drawer,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import { signIn, signOut, useSession } from 'next-auth/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { BsSpotify, BsMusicNoteBeamed } from 'react-icons/bs';
import { RiDoorOpenFill } from 'react-icons/ri';
import { AiFillHome, AiFillStar } from 'react-icons/ai';
import { FaUserAlt } from 'react-icons/fa';
import { HiOutlineMenuAlt1 } from 'react-icons/hi';

import { CALLBACK_URL } from '../../constants/urls';

const Header = () => {
  const { data: isLoggedIn } = useSession();
  const { pathname } = useRouter();
  const [isMobile] = useMediaQuery('(min-width: 1020px)');
  const { isOpen, onOpen, onClose } = useDisclosure();

  return isMobile ? (
    <HStack
      as="nav"
      zIndex="popover"
      justifyContent="space-between"
      alignItems="center"
      w="full"
    >
      <Container
        bg="header-bg"
        display="flex"
        variant="sidebar"
        alignItems="center"
        justifyContent="space-between"
        height="full"
        py={4}
        px={0}
        flexDirection="column"
      >
        <VStack spacing={8} w="full">
          <VStack w="full" px={0} spacing={4}>
            <NextLink href="/" passHref>
              <Link>
                <Heading size="sm">unwrapped.me</Heading>
              </Link>
            </NextLink>
            <Divider />
          </VStack>
          <VStack w="full" px={3}>
            <Button
              size="sm"
              variant="ghost"
              w="full"
              isActive={pathname === '/'}
              leftIcon={<Icon as={AiFillHome} />}
            >
              Home
            </Button>
            <Button
              size="sm"
              variant="ghost"
              w="full"
              leftIcon={<Icon as={FaUserAlt} />}
            >
              Profile
            </Button>
            <Button
              size="sm"
              variant="ghost"
              w="full"
              leftIcon={<Icon as={AiFillStar} />}
            >
              Top Artists
            </Button>
            <Button
              size="sm"
              variant="ghost"
              w="full"
              leftIcon={<Icon as={BsMusicNoteBeamed} />}
            >
              Top Tracks
            </Button>
          </VStack>
        </VStack>

        <VStack w="full" spacing={3}>
          <Divider />
          <Box px={3} w="full">
            {isLoggedIn ? (
              <Button
                size="sm"
                w="100%"
                leftIcon={<Icon as={RiDoorOpenFill} />}
                onClick={() => signOut({ redirect: true })}
              >
                Sign Out
              </Button>
            ) : (
              <Button
                size="sm"
                w="100%"
                leftIcon={<Icon as={BsSpotify} />}
                onClick={() => signIn('spotify', { callbackUrl: CALLBACK_URL })}
              >
                Sign In
              </Button>
            )}
          </Box>
        </VStack>
      </Container>
    </HStack>
  ) : (
    <HStack
      as="nav"
      top={0}
      insetX={0}
      justifyContent="space-between"
      alignItems="center"
      w="full"
      py={3}
      bg="header-bg"
      transitionProperty="background"
      transitionDuration="normal"
      mb={16}
      px={4}
    >
      <IconButton
        variant="ghost"
        aria-label="Navigation Menu"
        icon={<HiOutlineMenuAlt1 />}
        color="white"
        fontSize="xl"
        onClick={onOpen}
      />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="sm">
        <DrawerOverlay />

        <DrawerContent bg="header-bg" py={4}>
          <VStack spacing={8} w="full" h="full">
            <VStack w="full" px={0} spacing={4}>
              <HStack>
                <NextLink href="/" passHref>
                  <Link>
                    <Heading size="sm">unwrapped.me</Heading>
                  </Link>
                </NextLink>
                <DrawerCloseButton />
              </HStack>
              <Divider />
            </VStack>
            <VStack w="full" px={3}>
              <Button
                size="sm"
                variant="ghost"
                w="full"
                isActive={pathname === '/'}
                leftIcon={<Icon as={AiFillHome} />}
              >
                Home
              </Button>
              <Button
                size="sm"
                variant="ghost"
                w="full"
                leftIcon={<Icon as={FaUserAlt} />}
              >
                Profile
              </Button>
              <Button
                size="sm"
                variant="ghost"
                w="full"
                leftIcon={<Icon as={AiFillStar} />}
              >
                Top Artists
              </Button>
              <Button
                size="sm"
                variant="ghost"
                w="full"
                leftIcon={<Icon as={BsMusicNoteBeamed} />}
              >
                Top Tracks
              </Button>
            </VStack>
          </VStack>
          <VStack w="full" spacing={3}>
            <Divider />
            <Box px={3} w="full">
              {isLoggedIn ? (
                <Button
                  size="sm"
                  w="100%"
                  leftIcon={<Icon as={RiDoorOpenFill} />}
                  onClick={() => signOut({ redirect: true })}
                >
                  Sign Out
                </Button>
              ) : (
                <Button
                  size="sm"
                  w="100%"
                  leftIcon={<Icon as={BsSpotify} />}
                  onClick={() =>
                    signIn('spotify', { callbackUrl: CALLBACK_URL })
                  }
                >
                  Sign In
                </Button>
              )}
            </Box>
          </VStack>
        </DrawerContent>
      </Drawer>
    </HStack>
  );
};

export default Header;
