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

import menu from '../../constants/menu';
import { MenuItem } from '../../types/menu-item';
import SignInButton from './sign-in-button';
import SignOutButton from './sign-out-button';

const Topbar = () => {
  const { data: isLoggedIn } = useSession();
  const { pathname } = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
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
              {menu.map((menuItem: MenuItem) => (
                <Button
                  key={menuItem.title}
                  size="sm"
                  variant="ghost"
                  w="full"
                  isActive={pathname === menuItem.path}
                  leftIcon={<Icon as={menuItem.icon} />}
                >
                  {menuItem.title}
                </Button>
              ))}
            </VStack>
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
