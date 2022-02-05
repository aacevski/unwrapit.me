import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { VStack, Image, Heading, Text } from '@chakra-ui/react';
import { Artist } from '../types/artist';
import Sparkles from '../components/sparkles';

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
      width="max-content"
      rounded="lg"
    >
      <Heading transform={`scale(${scale})`}>Your top artist is...</Heading>
      {artist && (
        <>
          <Image
            alt={artist?.name}
            src={artist?.images[0]?.url}
            w={96}
            h={96}
            rounded="lg"
            objectFit="cover"
            transform={`scale(${scale})`}
          />
          <Sparkles>
            <Heading size="2xl">{artist?.name}</Heading>
          </Sparkles>
        </>
      )}
    </VStack>
  );
};

export default TopArtists;
