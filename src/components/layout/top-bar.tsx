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
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Select,
  useDisclosure,
  VStack,
  Text,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { HiOutlineMenuAlt1 } from 'react-icons/hi';
import { ImCog } from 'react-icons/im';

import menu from '../../constants/menu';
import { UserContext } from '../../providers/user-provider';
import { MenuItem } from '../../types/menu-item';
import SignInButton from './sign-in-button';
import SignOutButton from './sign-out-button';

const Topbar = () => {
  const userContext = useContext(UserContext);
  const { setTimePeriod } = userContext;
  const { data: isLoggedIn } = useSession();
  const { pathname, push } = useRouter();
  const {
    isOpen: isNavigationOpen,
    onOpen: onNavigationOpen,
    onClose: onNavigationClose,
  } = useDisclosure();

  const { onOpen: onSettingsOpen } = useDisclosure();

  return (
    <HStack
      as="nav"
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
    >
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
        placement="left"
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
                    <Heading size="sm">unwrapped.me</Heading>
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
                    onClick={() => push(menuItem.path)}
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
      <Popover placement="top-end">
        <PopoverTrigger>
          <IconButton
            variant="ghost"
            aria-label="Settings"
            icon={<Icon as={ImCog} />}
            color="white"
            onClick={onSettingsOpen}
            size="sm"
          />
        </PopoverTrigger>
        <Portal>
          <PopoverContent bg="rgba(0, 0, 0, 1)" backdropBlur="24px">
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody p={4}>
              <Heading mb={4} size="md">
                settings
              </Heading>
              <Text fontSize="sm" mb={2}>
                time period:
              </Text>
              <Select
                size="sm"
                defaultValue="long_term"
                onChange={(e) => setTimePeriod(e.target.value)}
              >
                <option value="short_term">Short Term</option>
                <option value="medium_term">Medium Term</option>
                <option value="long_term">Long Term</option>
              </Select>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    </HStack>
  );
};

export default Topbar;
