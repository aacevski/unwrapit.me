import { Box, Image, Stack, VStack } from '@chakra-ui/react';
import { useContext } from 'react';
import { UserContext } from '../src/providers/user-provider';

const Profile = () => {
  const userContext = useContext(UserContext);
  const user = userContext?.user;

  return (
    <VStack w="full" alignItems="flex-start" px={20} spacing={14}>
      <Stack spacing={8} direction={['column', 'row']}>
        <Box pos="relative">
          <Image
            src={user?.picture ?? 'https://via.placeholder.com/150'}
            alt="profile"
            rounded="full"
            pos="absolute"
            objectFit="cover"
            w={24}
            h={24}
            inset={0}
            filter="blur(16px)"
            zIndex={0}
            transform="scale(1.1, 1.1)"
          />
          <Image
            src={user?.picture ?? 'https://via.placeholder.com/150'}
            alt="profile"
            rounded="full"
            pos="relative"
            objectFit="cover"
            w={24}
            h={24}
          />
        </Box>
      </Stack>
    </VStack>
  );
};

export default Profile;
