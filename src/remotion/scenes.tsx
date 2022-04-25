import { Series } from 'remotion';

import { Transition } from './transition';
import TopArtists from './top-artist';
import { Artist } from '../types/artist';
import { Track } from '../types/track';
import TopTracks from './top-track';
import TopGenres from './top-genres';
import EndScreen from './end-screen';

type Props = {
  artist: Artist;
  track: Track;
  genres: string[] | undefined;
  trackUris: string[] | undefined;
};

const Scenes = ({ artist, track, genres, trackUris }: Props) => {
  return (
    <Series>
      <Series.Sequence durationInFrames={120}>
        <Transition>
          <TopArtists artist={artist} />
        </Transition>
      </Series.Sequence>
      <Series.Sequence durationInFrames={120} offset={0}>
        <Transition>
          <TopTracks track={track} />
        </Transition>
      </Series.Sequence>
      <Series.Sequence durationInFrames={280} offset={0}>
        <Transition>
          <TopGenres genres={genres} />
        </Transition>
      </Series.Sequence>
      <Series.Sequence durationInFrames={280} offset={0}>
        <Transition>
          <EndScreen trackUris={trackUris} />
        </Transition>
      </Series.Sequence>
    </Series>
  );
};

export default Scenes;
