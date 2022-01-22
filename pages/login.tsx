import { VStack, Button, Text, Icon } from '@chakra-ui/react';
import { signIn } from 'next-auth/react';
import { BsSpotify } from 'react-icons/bs';

import { CALLBACK_URL } from '../src/constants/urls';

const Login = () => {
  return (
    <VStack align="center" justify="center" w="full">
      <Button
        onClick={() => signIn('spotify', { callbackUrl: CALLBACK_URL })}
        leftIcon={<Icon as={BsSpotify} />}
      >
        sign in
      </Button>
    </VStack>
  );
};

export default Login;
