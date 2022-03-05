import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { VStack, Image, Heading } from '@chakra-ui/react';
import { Track } from '../types/track';
import Sparkles from '../components/sparkles';

type Props = {
  track: Track;
};

const TopTracks = ({ track }: Props) => {
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
      <Heading transform={`scale(${scale})`}>Your top track is...</Heading>
      {track && (
        <>
          <Image
            alt={track?.name}
            src={track?.album?.images[0]?.url}
            w={96}
            h={96}
            rounded="lg"
            objectFit="cover"
            transform={`scale(${scale})`}
          />
          <Sparkles>
            <Heading size="2xl">{track?.name}</Heading>
          </Sparkles>
        </>
      )}
    </VStack>
  );
};

export default TopTracks;
