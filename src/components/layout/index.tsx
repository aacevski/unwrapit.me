import { PropsWithChildren, useContext } from 'react';
import {
  VStack,
  Container,
  IconButton,
  Icon,
  useDisclosure,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Select,
  Heading,
  Text,
} from '@chakra-ui/react';
import { ImCog } from 'react-icons/im';

import Header from './header';
import useMediaQuery from '../../hooks/use-media-query';
import { UserContext } from '../../providers/user-provider';

type Props = PropsWithChildren<{}>;

const Layout = ({ children }: Props) => {
  const isMobile = useMediaQuery(992);
  const { onOpen } = useDisclosure();
  const userContext = useContext(UserContext);
  const { setTimePeriod, user } = userContext;

  return (
    <Container
      display="flex"
      maxW="full"
      minH="100vh"
      px={0}
      centerContent
      position="relative"
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
