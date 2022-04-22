import { Series } from 'remotion';

import { Transition } from './transition';
import TopArtists from './top-artist';
import { Artist } from '../types/artist';
import { Track } from '../types/track';
import TopTracks from './top-track';
import TopGenres from './top-genres';

type Props = {
  artist: Artist;
  track: Track;
  genres: string[] | undefined;
};

const Scenes = ({ artist, track, genres }: Props) => {
  return (
    <Series>
      <Series.Sequence durationInFrames={120}>
        <Transition>
          <TopArtists artist={artist} />
        </Transition>
      </Series.Sequence>
      <Series.Sequence durationInFrames={120} offset={-25}>
        <Transition>
          <TopTracks track={track} />
        </Transition>
      </Series.Sequence>
      <Series.Sequence durationInFrames={120} offset={-25}>
        <Transition>
          <TopGenres genres={genres} />
        </Transition>
      </Series.Sequence>
    </Series>
  );
};

export default Scenes;
