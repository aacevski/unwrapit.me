import { useEffect, useRef, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useQuery } from 'react-query';
import { getSession } from 'next-auth/react';
import { continueRender, delayRender } from 'remotion';
import { Player, PlayerRef } from '@remotion/player';
import { VStack, Container } from '@chakra-ui/react';

import { User } from '../src/types/user';
import { isAuthenticated } from '../src/utils/is-authenticated';
import fetcher from '../src/utils/fetcher';
import { Artists } from '../src/types/artist';
import { Tracks } from '../src/types/track';
import Scenes from '../src/remotion/scenes';

type Props = {
  user: User;
};

const IndexPage = ({ user }: Props) => {
  const player = useRef<PlayerRef>(null);
  // eslint-disable-next-line no-unused-vars
  const [playing, setPlaying] = useState(false);

  const { data: artists } = useQuery<Artists>(
    'get-top-artists',
    () => fetcher('/api/top-artists?time_range=long_term'),
    { refetchOnMount: false, refetchOnWindowFocus: false }
  );
  const { data: tracks } = useQuery<Tracks>(
    'get-top-tracks',
    () => fetcher('/api/top-tracks?time_range=long_term'),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const [handle] = useState(() => delayRender());

  useEffect(() => {
    if (!user || !player.current) {
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
  }, [user]);

  useEffect(() => {
    if (artists) {
      continueRender(handle);
    }
    if (tracks) {
      continueRender(handle);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [artists, tracks]);

  return (
    <VStack align="center" justify="center" w="full" h="full" flex={1}>
      {artists && tracks && (
        <Container display="flex" maxW="container.sm" centerContent>
          <Player
            ref={player}
            component={Scenes}
            durationInFrames={240}
            compositionHeight={1080}
            compositionWidth={1080}
            fps={30}
            style={{
              margin: 'auto',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
            inputProps={{
              artist: artists?.items[0],
              track: tracks?.items[0],
            }}
            controls
          />
        </Container>
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

