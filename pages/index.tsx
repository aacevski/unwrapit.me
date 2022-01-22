import { GetServerSideProps } from 'next';
import { Avatar, Text, VStack } from '@chakra-ui/react';
import { getSession } from 'next-auth/react';

import { User } from '../src/types/user';
import { isAuthenticated } from '../src/utils/is-authenticated';

type Props = {
  user: User;
};

const IndexPage = ({ user }: Props) => {
  return (
    <VStack align="center" justify="center" w="full">
      <Avatar size="lg" src={user?.picture || ''} />
      <Text>hey, {user?.name}!</Text>
    </VStack>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!isAuthenticated(session)) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return { props: { user: session?.user } };
};

export default IndexPage;
