import { keyframes } from '@chakra-ui/react';

export const spin = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(180deg);
    }
  `;

export const comeInOut = keyframes`
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`;

