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
      rounded="lg"
      bg="linear-gradient(to right, #4e54c8, #8f94fb)"
      h="full"
      w="full"
      justify="center"
    >
      <Heading size="xl" transform={`scale(${scale})`}>
        You can't seem to get enough from...
      </Heading>
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
