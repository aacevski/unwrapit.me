import React from 'react';
import { Composition } from 'remotion';

import Scenes from './scenes';
import TopArtist from './top-artist';

const Compositions = () => {
  return (
    <>
      <Composition
        component={Scenes}
        durationInFrames={120}
        height={1080}
        width={1080}
        fps={30}
        id="scenes"
      />
      <Composition
        component={TopArtist}
        durationInFrames={120}
        height={1080}
        width={1080}
        fps={30}
        id="top-artist"
      />
    </>
  );
};

export default Compositions;
