import { useEffect, useRef, useState } from 'react';
import { GetServerSideProps } from 'next';
import useSWR from 'swr';
import { getSession } from 'next-auth/react';
import { continueRender, delayRender } from 'remotion';
import { Player, PlayerRef } from '@remotion/player';
import { Avatar, Text, VStack, Container } from '@chakra-ui/react';

import { User } from '../src/types/user';
import { isAuthenticated } from '../src/utils/is-authenticated';
import fetcher from '../src/utils/fetcher';
import { Artists } from '../src/types/artist';
import Scenes from '../src/remotion/scenes';

type Props = {
  user: User;
};

const IndexPage = ({ user }: Props) => {
  const player = useRef<PlayerRef>(null);
  const [playing, setPlaying] = useState(false);
  const { data } = useSWR<Artists>(
    '/api/top-artists?time_range=long_term',
    fetcher
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
    if (data) {
      continueRender(handle);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <VStack align="center" justify="center" w="full" h="full" flex={1}>
      {data && (
        <Container display="flex" maxW="container.sm" centerContent>
          <Player
            ref={player}
            component={Scenes}
            durationInFrames={120}
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
              artist: data?.items[0],
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
