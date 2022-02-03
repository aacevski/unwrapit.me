import { PropsWithChildren, useState } from 'react';
import { Box } from '@chakra-ui/react';

import { comeInOut, spin } from '../../constants/animation';
import { path } from '../../constants/svg';
import usePrefersReducedMotion from '../../hooks/use-prefers-reduced-motion';
import useRandomInterval from '../../hooks/use-random-interval';
import generateSparkle from '../../utils/generate-sparkle';
import range from '../../utils/range';
import { Sparkle } from '../../types/sparkle';

type Props = PropsWithChildren<{}>;

const Sparkles = ({ children }: Props) => {
  const [sparkles, setSparkles] = useState(() => {
    return range(3).map(() => generateSparkle('#FFC700'));
  });
  const prefersReducedMotion = usePrefersReducedMotion();

  useRandomInterval(
    () => {
      const sparkle = generateSparkle('#FFC700');
      const now = Date.now();
      const nextSparkles = sparkles.filter((sparkle: Sparkle) => {
        const delta = now - sparkle.createdAt;
        return delta < 750;
      });
      nextSparkles.push(sparkle);
      setSparkles(nextSparkles);
    },
    prefersReducedMotion ? undefined : 50,
    prefersReducedMotion ? undefined : 450
  );

  return (
    <Box display="inline-block" position="relative">
      {sparkles.map((sparkle) => (
        <Box
          as="span"
          position="absolute"
          display="block"
          top={sparkle.top}
          left={sparkle.left}
          zIndex={sparkle.zIndex}
          animation={` ${comeInOut} 700ms forwards`}
          key={sparkle.id}
        >
          <Box
            as="svg"
            width={`${sparkle.size}px`}
            height={`${sparkle.size}px`}
            viewBox="0 0 68 68"
            fill="none"
            animation={`${spin} 1000ms linear`}
          >
            <path d={path} fill={sparkle.color} />
          </Box>
        </Box>
      ))}
      <Box position="relative" zIndex="1">
        {children}
      </Box>
    </Box>
  );
};

export default Sparkles;
