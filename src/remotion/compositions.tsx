import React from 'react';
import { Composition } from 'remotion';

import Scenes from './scenes';
import TopArtist from './top-artist';
import TopTracks from './top-track';

const Compositions = () => {
  return (
    <>
      <Composition
        component={Scenes}
        durationInFrames={240}
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
      <Composition
        component={TopTracks}
        durationInFrames={120}
        height={1080}
        width={1080}
        fps={30}
        id="top-track"
      />
    </>
  );
};

export default Compositions;
