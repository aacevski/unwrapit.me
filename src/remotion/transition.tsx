import { VStack } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

type Props = PropsWithChildren<{}>;

export const Transition = ({ children }: Props) => {
  const { fps, width } = useVideoConfig();
  const frame = useCurrentFrame();
  const spr = spring({
    fps,
    frame,
    config: {
      mass: 0.5,
      damping: 200,
    },
  });
  const translation = interpolate(spr, [0, 1], [width, 0]);
  const perc = interpolate(spr, [0, 1], [50, 0]);
  return (
    <VStack
      width="100%"
      height="100%"
      justify="center"
      align="center"
      rounded="lg"
      mt={10}
      bg="linear-gradient(to right, #4e54c8, #8f94fb)"
    >
      <AbsoluteFill
        style={{
          borderTopLeftRadius: `${perc}% 50%`,
          borderBottomLeftRadius: `${perc}% 50%`,
          left: translation,
          WebkitMaskImage: '-webkit-radial-gradient(white, black)',
        }}
      >
        <AbsoluteFill
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {children}
        </AbsoluteFill>
      </AbsoluteFill>
    </VStack>
  );
};
