import { Session } from '../types/session';

export const spotifyFetcher = async (url: string, session: Session | null) => {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`,
    },
  }).then((res) => res.json());

  return res;
};
