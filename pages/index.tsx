import { Container, useDisclosure, VStack } from '@chakra-ui/react';
import { Player, PlayerRef } from '@remotion/player';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { continueRender, delayRender } from 'remotion';

import SettingsPopover from '../src/components/settings-popover';
import Spinner from '../src/components/spinner';
import useMediaQuery from '../src/hooks/use-media-query';
import { useUser } from '../src/providers/user-provider';
import Scenes from '../src/remotion/scenes';
import { Artists } from '../src/types/artist';
import { Tracks } from '../src/types/track';
import fetcher from '../src/utils/fetcher';
import getTopGenres from '../src/utils/get-top-genres';
import getTrackUris from '../src/utils/get-track-uris';
import { isAuthenticated } from '../src/utils/is-authenticated';

const IndexPage = () => {
  const player = useRef<PlayerRef>(null);
  const { timePeriod } = useUser();
  const isMobile = useMediaQuery(992);
  const [playing, setPlaying] = useState(false);
  const [handle] = useState(() => delayRender());

  const { data: artists, isLoading: isLoadingArtists } = useQuery<Artists>(
    [`get-top-artists`, timePeriod],
    () => fetcher(`/api/top-artists?time_range=${timePeriod}`),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      keepPreviousData: false,
    }
  );
  const { data: tracks, isLoading: isLoadingTracks } = useQuery<Tracks>(
    [`get-top-tracks`, timePeriod],
    () => fetcher(`/api/top-tracks?time_range=${timePeriod}`),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      keepPreviousData: false,
    }
  );

  const isLoading = isLoadingArtists || isLoadingTracks;
  const trackUris = getTrackUris(tracks);
  const genres = getTopGenres(artists);

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
  }, []);

  useEffect(() => {
    if (artists && tracks) {
      continueRender(handle);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [artists, tracks]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <VStack
        align="center"
        justify="center"
        w="full"
        h="full"
        flex={1}
        pos="relative"
        pt={32}
      >
        <Container display="flex" maxW="container.sm">
          {artists && tracks && (
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
          )}
        </Container>
      </VStack>
      {!isMobile && <SettingsPopover />}
    </>
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

