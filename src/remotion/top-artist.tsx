/* eslint-disable react/no-unescaped-entities */
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { VStack, Image, Heading } from '@chakra-ui/react';

import { Artist } from '~types/artist';
import Sparkles from '~components/sparkles';

type Props = {
  artist: Artist;
};

const TopArtists = ({ artist }: Props) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const appear = spring({
    fps,
    frame,
    config: {
      mass: 2,
      damping: 200,
    },
  });

  const scale = interpolate(appear, [0, 2], [0, 2]);

  return (
    <VStack
      align="center"
      py={20}
      px={10}
      spacing={10}
      rounded="lg"
      h="full"
      w="full"
      justify="center"
      textAlign="center"
    >
      <Heading
        fontSize={{ base: '6xl', lg: '4xl' }}
        transform={`scale(${scale})`}
      >
        You can't seem to get enough from...
      </Heading>
      {artist && (
        <>
          <Image
            alt={artist?.name}
            src={artist?.images[0]?.url}
            w={{ base: '600px', lg: '300px' }}
            rounded="lg"
            objectFit="cover"
            transform={`scale(${scale})`}
          />
          <Sparkles>
            <Heading fontSize={{ base: '8xl', lg: '6xl' }}>
              {artist?.name}
            </Heading>
          </Sparkles>
        </>
      )}
    </VStack>
  );
};

export default TopArtists;
