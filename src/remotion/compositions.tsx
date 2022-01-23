import React from 'react';
import { Composition } from 'remotion';

import TopArtist from './top-artist';

const Compositions = () => {
  return (
    <>
      <Composition
        component={TopArtist}
        durationInFrames={120}
        height={1080}
        width={1080}
        fps={30}
        id="hello-world"
      />
    </>
  );
};

export default Compositions;
