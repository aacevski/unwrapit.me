import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { VStack, Heading } from '@chakra-ui/react';
import GenreItem from '../components/genre-item';

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
      bg="linear-gradient(to top, #11998e, #38ef7d)"
      h="full"
      w="full"
      justify="center"
    >
      <Heading transform={`scale(${scale})`}>
        Your favorite genres are...
      </Heading>
      <VStack w="full">
        {genres &&
          genres.map((genre, index) => (
            <GenreItem key={genre} genre={genre} index={index} />
          ))}
      </VStack>
    </VStack>
  );
};

export default TopGenres;
