import { useState } from 'react';
import { useQuery } from 'react-query';
import { VStack, Heading, Button } from '@chakra-ui/react';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';

import fetcher from '../utils/fetcher';

type Props = {
  trackUris: string[] | undefined;
};

const EndScreen = ({ trackUris }: Props) => {
  const [isPlaylistGenerated, setIsPlaylistGenerated] = useState(false);
  const { width, height } = useWindowSize();

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
        bg="linear-gradient(to right, #0f0c29, #302b63, #24243e)"
        py={20}
        px={10}
        spacing={10}
        rounded="lg"
      >
        <Heading>Were you happy with the results?</Heading>
        <Button
          px={10}
          height={28}
          fontSize="4xl"
          variant="solid"
          onClick={onClick}
          disabled={isPlaylistGenerated}
        >
          {isPlaylistGenerated ? 'Playlist generated' : 'Generate playlist'}
        </Button>
      </VStack>
      {isPlaylistGenerated && <Confetti width={width} height={height} />}
    </>
  );
};

export default EndScreen;
