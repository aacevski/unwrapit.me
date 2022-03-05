import { Button, Icon } from '@chakra-ui/react';
import { signIn } from 'next-auth/react';
import { BsSpotify } from 'react-icons/bs';

import { CALLBACK_URL } from '../../constants/urls';

const SignInButton = () => {
  return (
    <Button
      size="sm"
      w="100%"
      leftIcon={<Icon as={BsSpotify} />}
      onClick={() => signIn('spotify', { callbackUrl: CALLBACK_URL })}
    >
      Sign In
    </Button>
  );
};

export default SignInButton;
