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

import menu from '~constants/menu';
import { MenuItem } from '~types/menu-item';
import SignInButton from './sign-in-button';
import SignOutButton from './sign-out-button';

const Sidebar = () => {
  const { data: isLoggedIn } = useSession();
  const { pathname, push } = useRouter();

  return (
    <Container
      pos="fixed"
      as="nav"
      left={0}
      top={0}
      bgColor="rgba(0, 0, 0, 0.9)"
      backdropBlur="24px"
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
              <Heading size="sm">unwrapit.me</Heading>
            </Link>
          </NextLink>
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
    </Container>
  );
};

export default Sidebar;
