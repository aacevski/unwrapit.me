import { useEffect, useRef, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useQuery } from 'react-query';
import { getSession } from 'next-auth/react';
import { continueRender, delayRender } from 'remotion';
import { Player, PlayerRef } from '@remotion/player';
import {
  VStack,
  Container,
  Spinner,
  Icon,
  Heading,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Select,
  useDisclosure,
  Text,
} from '@chakra-ui/react';

import fetcher from '../src/utils/fetcher';
import { Artists } from '../src/types/artist';
import Scenes from '../src/remotion/scenes';
import { Tracks } from '../src/types/track';
import useTopGenres from '../src/hooks/use-top-genres';
import useMediaQuery from '../src/hooks/use-media-query';
import { useUser } from '../src/providers/user-provider';
import { ImCog } from 'react-icons/im';
import { isAuthenticated } from '../src/utils/is-authenticated';

const IndexPage = () => {
  const player = useRef<PlayerRef>(null);
  const { onOpen } = useDisclosure();
  const [ready, setReady] = useState(false);
  const isMobile = useMediaQuery(1020);
  const [playing, setPlaying] = useState(false);
  const { timePeriod, setTimePeriod } = useUser();

  const { data: artists } = useQuery<Artists>(
    `get-top-artists-${timePeriod}`,
    () => fetcher(`/api/top-artists?time_range=${timePeriod}`),
    { refetchOnMount: false, refetchOnWindowFocus: false }
  );
  const { data: tracks } = useQuery<Tracks>(
    `get-top-tracks-${timePeriod}`,
    () => fetcher(`/api/top-tracks?time_range=${timePeriod}`),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const genres = useTopGenres(artists);
  const [handle] = useState(() => delayRender());

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!player.current) {
      return;
    }

    player.current.addEventListener('pause', () => {
      setPlaying(false);
    });

    player.current.addEventListener('ended', () => {
      setPlaying(false);
    });

    player.current.addEventListener('play', () => {
      setPlaying(true);
    });
  }, [ready]);

  useEffect(() => {
    if (artists && tracks) {
      continueRender(handle);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [artists, tracks]);

  const useGetTrackUris = () => {
    return tracks?.items.map((track) => track.uri);
  };

  const trackUris = useGetTrackUris();

  return (
    <VStack
      align="center"
      justify="center"
      w="full"
      h="full"
      flex={1}
      pos="relative"
    >
      {artists && tracks ? (
        <Container display="flex" maxW="container.sm">
          <Player
            ref={player}
            component={Scenes}
            durationInFrames={660}
            compositionHeight={isMobile ? 1920 : 1080}
            compositionWidth={1080}
            fps={30}
            style={{
              margin: 'auto',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '3px',
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
            }}
            inputProps={{
              artist: artists?.items[0],
              track: tracks?.items[0],
              genres,
              trackUris,
            }}
            controls
          />
        </Container>
      ) : (
        <Spinner size="xl" />
      )}
      {!isMobile && (
        <>
          <Popover placement="top-end">
            <PopoverTrigger>
              <IconButton
                pos="absolute"
                bottom={6}
                right={6}
                aria-label="Settings"
                bgColor="rgba(0, 0, 0, 0.9)"
                transition="all 0.2s"
                _hover={{
                  bgColor: 'rgba(0, 0, 0, 1)',
                  transform: 'scale(1.1)',
                }}
                icon={<Icon as={ImCog} />}
                onClick={onOpen}
              />
            </PopoverTrigger>
            <Portal>
              <PopoverContent bg="rgba(0, 0, 0, 0.9)" backdropBlur="24px">
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody p={4}>
                  <Heading mb={4} size="md">
                    settings
                  </Heading>
                  <Text fontSize="sm" mb={2}>
                    time period:
                  </Text>
                  <Select
                    size="sm"
                    defaultValue="long_term"
                    onChange={(e) => setTimePeriod(e.target.value)}
                  >
                    <option value="short_term">Short Term</option>
                    <option value="medium_term">Medium Term</option>
                    <option value="long_term">Long Term</option>
                  </Select>
                </PopoverBody>
              </PopoverContent>
            </Portal>
          </Popover>
        </>
      )}
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

