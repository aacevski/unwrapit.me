import { Series } from 'remotion';

import { Transition } from './transition';
import TopArtists from './top-artist';
import { Artist } from '../types/artist';
import { Track } from '../types/track';
import TopTracks from './top-track';

type Props = {
  artist: Artist;
  track: Track;
};

const Scenes = ({ artist, track }: Props) => {
  return (
    <Series>
      <Series.Sequence durationInFrames={130}>
        <Transition>
          <TopArtists artist={artist} />
        </Transition>
      </Series.Sequence>
      <Series.Sequence durationInFrames={260} offset={-25}>
        <Transition>
          <TopTracks track={track} />
        </Transition>
      </Series.Sequence>
    </Series>
  );
};

export default Scenes;
