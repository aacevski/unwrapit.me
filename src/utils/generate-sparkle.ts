import random from './random';

const generateSparkle = (color: string) => {
  return {
    id: String(random(10000, 99999)),
    createdAt: Date.now(),
    color,
    size: random(30, 40),
    top: random(0, 100) + '%',
    left: random(0, 100) + '%',
    zIndex: 2,
  };
};

export default generateSparkle;
