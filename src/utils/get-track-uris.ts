import { Track, Tracks } from '../types/track';

const getTrackUris = (tracks: Tracks | undefined) => {
  if (!tracks) return [];

  return tracks.items.map((track: Track) => track.uri);
};

export default getTrackUris;
