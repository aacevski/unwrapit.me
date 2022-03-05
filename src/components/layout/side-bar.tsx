import {
  Box,
  Button,
  Container,
  Divider,
  Heading,
  HStack,
  Icon,
  Link,
  VStack,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import menu from '../../constants/menu';
import { MenuItem } from '../../types/menu-item';
import SignInButton from './sign-in-button';
import SignOutButton from './sign-out-button';

const Sidebar = () => {
  const { data: isLoggedIn } = useSession();
  const { pathname } = useRouter();

  return (
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
      </Container>
    </HStack>
  );
};

export default Sidebar;
