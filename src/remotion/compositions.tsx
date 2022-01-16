import React from 'react';
import { Composition } from 'remotion';

import HelloWorld from './hello-word';

const Compositions = () => {
  return (
    <>
      <Composition
        component={HelloWorld}
        durationInFrames={120}
        width={1920}
        height={1080}
        fps={30}
        id="hello-world"
      />
    </>
  );
};

export default Compositions;
