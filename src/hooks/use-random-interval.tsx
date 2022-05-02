import { useCallback, useEffect, useRef } from 'react';

import random from '~utils/random';

const useRandomInterval = (
  callback: () => void,
  minDelay?: number,
  maxDelay?: number
) => {
  const timeoutId = useRef(0);
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    let isEnabled =
      typeof minDelay === 'number' && typeof maxDelay === 'number';
    if (isEnabled) {
      const handleTick = () => {
        const nextTickAt = random(minDelay || 50, maxDelay || 450);
        timeoutId.current = window.setTimeout(() => {
          savedCallback.current();
          handleTick();
        }, nextTickAt);
      };

      handleTick();
    }
    return () => window.clearTimeout(timeoutId.current);
  }, [minDelay, maxDelay]);

  const cancel = useCallback(function () {
    window.clearTimeout(timeoutId.current);
  }, []);

  return cancel;
};

export default useRandomInterval;
