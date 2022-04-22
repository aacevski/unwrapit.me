import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { VStack, Heading } from '@chakra-ui/react';

type Props = {
  genres: string[] | undefined;
};

const TopGenres = ({ genres }: Props) => {
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
      <Heading transform={`scale(${scale})`}>Your genres are:</Heading>
      <VStack w="full">
        {genres &&
          genres.map((genre) => (
            <Heading size="2xl" key={genre}>
              {genre}
            </Heading>
          ))}
      </VStack>
    </VStack>
  );
};

export default TopGenres;
