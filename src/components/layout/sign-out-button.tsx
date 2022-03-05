import { Button, Icon } from '@chakra-ui/react';
import { signOut } from 'next-auth/react';
import { RiDoorOpenFill } from 'react-icons/ri';

const SignOutButton = () => {
  return (
    <Button
      size="sm"
      w="100%"
      leftIcon={<Icon as={RiDoorOpenFill} />}
      onClick={() => signOut({ redirect: true })}
    >
      Sign Out
    </Button>
  );
};

export default SignOutButton;
