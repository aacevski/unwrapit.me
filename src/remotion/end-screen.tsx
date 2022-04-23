import { VStack, Heading, Button } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import fetcher from '../utils/fetcher';

type Props = {
  trackUris: string[] | undefined;
};

const EndScreen = ({ trackUris }: Props) => {
  const { refetch } = useQuery(
    'create-playlist',
    () =>
      fetcher('/api/create-playlist', {
        method: 'POST',
        body: JSON.stringify({
          trackUris,
        }),
      }),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      enabled: false,
    }
  );

  const onClick = () => {
    refetch();
  };

  return (
    <VStack
      w="full"
      h="full"
      align="center"
      justify="center"
      bg="linear-gradient(to right, #0f0c29, #302b63, #24243e)"
      py={20}
      px={10}
      spacing={10}
      rounded="lg"
    >
      <Heading>Were you happy with the results?</Heading>
      <Button
        width={80}
        height={20}
        fontSize="2xl"
        variant="solid"
        onClick={onClick}
      >
        Generate playlist
      </Button>
    </VStack>
  );
};

export default EndScreen;
