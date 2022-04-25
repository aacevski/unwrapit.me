import { useState } from 'react';
import { useQuery } from 'react-query';
import { VStack, Heading, Button } from '@chakra-ui/react';
import Confetti from 'react-confetti';

import fetcher from '../utils/fetcher';

type Props = {
  trackUris: string[] | undefined;
};

const EndScreen = ({ trackUris }: Props) => {
  const [isPlaylistGenerated, setIsPlaylistGenerated] = useState(false);

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
    setIsPlaylistGenerated(true);
  };

  return (
    <>
      <VStack
        w="full"
        h="full"
        align="center"
        justify="center"
        py={20}
        px={10}
        spacing={10}
        rounded="lg"
        textAlign="center"
      >
        <Heading fontSize={{ base: '8xl', lg: '6xl' }}>
          Were you happy with the results?
        </Heading>
        <Button
          px={10}
          height={28}
          fontSize={{ base: '6xl', lg: '4xl' }}
          variant="solid"
          onClick={onClick}
          disabled={isPlaylistGenerated}
        >
          {isPlaylistGenerated ? 'Playlist generated' : 'Generate playlist'}
        </Button>
      </VStack>
      {isPlaylistGenerated && <Confetti width={2000} height={2000} />}
    </>
  );
};

export default EndScreen;
