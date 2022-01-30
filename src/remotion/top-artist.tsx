import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { VStack, Image, Heading } from '@chakra-ui/react';
import { Artist } from '../types/artist';
import { Transition } from './transition';

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

  const scale = interpolate(appear, [0, 1], [0, 1]);

  return (
    <Transition>
      <VStack
        width="100%"
        justify="center"
        align="center"
        rounded="xl"
        mt={10}
        height="100%"
        backgroundImage="linear-gradient(
        45deg,
        hsl(240deg 100% 20%) 0%,
        hsl(289deg 100% 21%) 11%,
        hsl(315deg 100% 27%) 22%,
        hsl(329deg 100% 36%) 33%,
        hsl(337deg 100% 43%) 44%,
        hsl(357deg 91% 59%) 56%,
        hsl(17deg 100% 59%) 67%,
        hsl(34deg 100% 53%) 78%,
        hsl(45deg 100% 50%) 89%,
        hsl(55deg 100% 50%) 100%
      );"
        spacing={8}
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
            <Heading transform={`scale(${scale})`}>{artist?.name}</Heading>
          </>
        )}
      </VStack>
    </Transition>
  );
};

export default TopArtists;
