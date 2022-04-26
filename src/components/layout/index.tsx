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
  const isMobile = useMediaQuery(1020);
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
      {!isMobile && user && (
        <>
          <Popover placement="top-end">
            <PopoverTrigger>
              <IconButton
                pos="absolute"
                bottom={6}
                right={6}
                aria-label="Settings"
                bgColor="rgba(0, 0, 0, 0.9)"
                transition="all 0.2s"
                _hover={{
                  bgColor: 'rgba(0, 0, 0, 1)',
                  transform: 'scale(1.1)',
                }}
                icon={<Icon as={ImCog} />}
                onClick={onOpen}
              />
            </PopoverTrigger>
            <Portal>
              <PopoverContent bg="rgba(0, 0, 0, 0.9)" backdropBlur="24px">
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
        </>
      )}
    </Container>
  );
};

export default Layout;
