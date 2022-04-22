import { Artist, Artists } from '../types/artist';

const useTopGenres = (artists: Artists | undefined) => {
  if (!artists) return;

  const genres = artists.items.map((artist: Artist) => artist.genres).flat();

  const topGenres = genres
    .filter(
      (genre: string, index: number, self: string[]) =>
        self.indexOf(genre) === index
    )
    .sort((a: string, b: string) => {
      return (
        genres.filter((genre: string) => genre === b).length -
        genres.filter((genre: string) => genre === a).length
      );
    })
    .slice(0, 5);

  return topGenres;
};

export default useTopGenres;
