import { GetServerSideProps } from 'next';
import { Avatar, Text, VStack } from '@chakra-ui/react';
import { signIn, getSession } from 'next-auth/react';

import { CALLBACK_URL } from '../src/constants/urls';
import { User } from '../src/types/user';

type Props = {
  user: User;
};

const IndexPage = ({ user }: Props) => {
  if (user) {
    return (
      <VStack align="center" justify="center" w="full">
        <Avatar size="lg" src={user?.picture || ''} />
        <Text>Hey, {user?.name}!</Text>
      </VStack>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn('spotify', { callbackUrl: CALLBACK_URL })}>
        Sign in
      </button>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const session = await getSession(context);

  return { props: { user: null } };
};

export default IndexPage;
