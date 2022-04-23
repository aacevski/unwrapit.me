import { Heading } from '@chakra-ui/react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

type Props = {
  index: number;
  genre: string;
};

const GenreItem = ({ index, genre }: Props) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({
    frame: frame - 40 - index * 20,
    fps,
    config: {
      damping: 200,
    },
  });
  const rad = interpolate(progress, [0, 1], [-Math.PI, 0]);
  const direction = index % 2 === 0 ? '-5000px' : '5000px';
  const isItemVisible = rad < -Math.PI / 2;

  return (
    <Heading
      size="2xl"
      transform={
        isItemVisible ? `translate(${direction}, 0px)` : 'translate(0px, 0px)'
      }
      transition="transform 1500ms ease-in-out"
    >
      {genre}
    </Heading>
  );
};

export default GenreItem;
