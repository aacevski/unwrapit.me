import { VStack, Heading, Link, Text } from '@chakra-ui/react';

import { signIn } from 'next-auth/react';
import { CALLBACK_URL } from '../src/constants/urls';

const Login = () => {
  return (
    <VStack
      align="center"
      justify="center"
      w="full"
      h="full"
      flex={1}
      spacing={10}
      textAlign="center"
    >
      <VStack>
        <Heading size="lg">who?</Heading>
        <Heading size="md" fontWeight="light">
          <Link
            isExternal
            href="https://github.com/aacevski/unwrapit.me"
            target="_blank"
          >
            <strong>unwrapit.me</strong>
          </Link>{' '}
          is an open source project
        </Heading>
      </VStack>
      <VStack>
        <Heading>what?</Heading>
        <Heading size="md" fontWeight="light">
          it generates a video based on your most listened artists / tracks
        </Heading>
      </VStack>
      <VStack>
        <Heading size="lg">how?</Heading>
        <Heading size="md" fontWeight="light">
          to proceed, please{' '}
          <Text
            as="span"
            decoration="underline"
            cursor="pointer"
            onClick={() => signIn('spotify', { callbackUrl: CALLBACK_URL })}
          >
            sign in
          </Text>
        </Heading>
      </VStack>
    </VStack>
  );
};

export default Login;
