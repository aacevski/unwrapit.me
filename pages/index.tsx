import { useContext, useEffect, useRef, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useQuery } from 'react-query';
import { getSession } from 'next-auth/react';
import { AbsoluteFill, continueRender, delayRender } from 'remotion';
import { Player, PlayerRef } from '@remotion/player';
import { VStack, Container, Spinner, Icon, Box } from '@chakra-ui/react';
import { FaPlay } from 'react-icons/fa';

import { User } from '../src/types/user';
import { isAuthenticated } from '../src/utils/is-authenticated';
import fetcher from '../src/utils/fetcher';
import { Artists } from '../src/types/artist';
import Scenes from '../src/remotion/scenes';
import { Tracks } from '../src/types/track';
import useTopGenres from '../src/hooks/use-top-genres';
import useMediaQuery from '../src/hooks/use-media-query';
import { UserContext } from '../src/providers/user-provider';

type Props = {
  user: User;
};

const IndexPage = ({ user }: Props) => {
  const player = useRef<PlayerRef>(null);
  const [ready, setReady] = useState(false);
  const isMobile = useMediaQuery(1020);
  const [playing, setPlaying] = useState(false);
  const userContext = useContext(UserContext);
  const { timePeriod } = userContext;

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

