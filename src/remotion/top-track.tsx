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
      rounded="lg"
      bg="linear-gradient(to top, #bc4e9c, #f80759)"
      h="full"
      w="full"
      justify="center"
      textAlign="center"
    >
      <Heading
        fontSize={{ base: '6xl', lg: '4xl' }}
        transform={`scale(${scale})`}
      >
        The song you keep on repeat is...
      </Heading>
      {track && (
        <>
          <Image
            alt={track?.name}
            src={track?.album?.images[0]?.url}
            w={{ base: '600px', lg: '300px' }}
            rounded="lg"
            objectFit="cover"
            transform={`scale(${scale})`}
          />
          <Sparkles>
            <Heading fontSize={{ base: '8xl', lg: '6xl' }}>
              {track?.name}
            </Heading>
          </Sparkles>
        </>
      )}
    </VStack>
  );
};

export default TopTracks;
