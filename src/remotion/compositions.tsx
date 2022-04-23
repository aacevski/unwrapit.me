import React from 'react';
import { Composition } from 'remotion';
import EndScreen from './end-screen';

import Scenes from './scenes';
import TopArtist from './top-artist';
import TopGenres from './top-genres';
import TopTracks from './top-track';

const Compositions = () => {
  return (
    <>
      <Composition
        component={Scenes}
        durationInFrames={360}
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
      <Composition
        component={TopGenres}
        durationInFrames={280}
        height={1080}
        width={1080}
        fps={30}
        id="top-genres"
      />
      <Composition
        component={EndScreen}
        durationInFrames={280}
        height={1080}
        width={1080}
        fps={30}
        id="end-screen"
      />
    </>
  );
};

export default Compositions;
