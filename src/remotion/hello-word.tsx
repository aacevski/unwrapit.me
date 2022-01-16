import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { VStack, Button } from '@chakra-ui/react';

type Props = {
  text: string;
};

const HelloWorld = ({ text }: Props) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    fps,
    from: 0,
    to: 3,
    frame,
  });

  return (
    <VStack height="100vh" width="100%" justify="center" align="center">
      <Button
        colorScheme="teal"
        variant="outline"
        transform={`scale(${scale})`}
      >
        {text}
      </Button>
    </VStack>
  );
};

export default HelloWorld;
