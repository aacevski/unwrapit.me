import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Heading,
  HStack,
  Icon,
  IconButton,
  Link,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { HiOutlineMenuAlt1 } from 'react-icons/hi';

import menu from '~constants/menu';
import { useUser } from '~providers/user-provider';
import { MenuItem } from '~types/menu-item';
import SignInButton from './sign-in-button';
import SignOutButton from './sign-out-button';
import Logo from '~components/icons/logo';

const Topbar = () => {
  const { user } = useUser();
  const { data: isLoggedIn } = useSession();
  const { pathname, push } = useRouter();
  const {
    isOpen: isNavigationOpen,
    onOpen: onNavigationOpen,
    onClose: onNavigationClose,
  } = useDisclosure();

  return (
    <HStack
      as="nav"
      position="fixed"
      top={0}
      insetX={0}
      justifyContent="space-between"
      alignItems="center"
      w="full"
      py={3}
      mb={16}
      px={4}
      bgColor="rgba(0, 0, 0, 0.9)"
      backdropBlur="24px"
      zIndex={100}
    >
      <NextLink href="/" passHref>
        <Link>
          <Logo w={28} />
        </Link>
      </NextLink>
      <IconButton
        variant="ghost"
        aria-label="Navigation Menu"
        icon={<Icon as={HiOutlineMenuAlt1} />}
        color="white"
        onClick={onNavigationOpen}
        size="lg"
      />

      <Drawer
        isOpen={isNavigationOpen}
        placement="right"
        onClose={onNavigationClose}
        size="sm"
      >
        <DrawerOverlay />
        <DrawerContent bg="header-bg" py={4}>
          <VStack spacing={8} w="full" h="full">
            <VStack w="full" px={0} spacing={4}>
              <HStack>
                <NextLink href="/" passHref>
                  <Link>
                    <Heading size="sm">unwrapit.me</Heading>
                  </Link>
                </NextLink>
                <DrawerCloseButton />
              </HStack>
              <Divider />
            </VStack>
            {isLoggedIn && (
              <VStack w="full" px={3}>
                {menu.map((menuItem: MenuItem) => (
                  <Button
                    key={menuItem.title}
                    size="sm"
                    variant="ghost"
                    w="full"
                    isActive={pathname === menuItem.path}
                    leftIcon={<Icon as={menuItem.icon} />}
                    onClick={() => {
                      onNavigationClose();
                      push(menuItem.path);
                    }}
                  >
                    {menuItem.title}
                  </Button>
                ))}
              </VStack>
            )}
          </VStack>
          <VStack w="full" spacing={3}>
            <Divider />
            <Box px={3} w="full">
              {isLoggedIn ? <SignOutButton /> : <SignInButton />}
            </Box>
          </VStack>
        </DrawerContent>
      </Drawer>
    </HStack>
  );
};

export default Topbar;
