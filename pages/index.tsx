import { Container, VStack } from '@chakra-ui/react';
import { Player, PlayerRef } from '@remotion/player';
import { useEffect, useRef, useState } from 'react';
import { continueRender, delayRender } from 'remotion';

import SettingsPopover from '~components/settings-popover';
import Spinner from '~components/spinner';
import useGetTopArtists from '~hooks/query/get-top-artists';
import useGetTopTracks from '~hooks/query/get-top-tracks';
import useMediaQuery from '~hooks/use-media-query';
import Scenes from '~remotion/scenes';
import getTopGenres from '~utils/get-top-genres';
import getTrackUris from '~utils/get-track-uris';

const IndexPage = () => {
  const player = useRef<PlayerRef>(null);
  const isMobile = useMediaQuery(992);
  const [handle] = useState(() => delayRender());
  const { data: tracks, isLoading: isLoadingTracks } = useGetTopTracks();
  const { data: artists, isLoading: isLoadingArtists } = useGetTopArtists();

  const isLoading = isLoadingArtists || isLoadingTracks;
  const trackUris = getTrackUris(tracks);
  const genres = getTopGenres(artists);

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
      {!isMobile && (
        <SettingsPopover
          position="fixed"
          bottom={6}
          right={6}
          bgColor="rgba(0, 0, 0, 0.9)"
          _hover={{
            bgColor: 'rgba(0, 0, 0, 1)',
            transform: 'scale(1.1)',
          }}
        />
      )}
    </>
  );
};

export default IndexPage;

