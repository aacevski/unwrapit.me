import { Series } from 'remotion';

import { Transition } from './transition';
import TopArtists from './top-artist';
import { Artist } from '../types/artist';

type Props = {
  artist: Artist;
};

const Scenes = ({ artist }: Props) => {
  return (
    <Series>
      <Series.Sequence durationInFrames={120}>
        <Transition>
          <TopArtists artist={artist} />
        </Transition>
      </Series.Sequence>
    </Series>
  );
};

export default Scenes;
