import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import { spotifyFetcher } from '../../src/utils/spotify-fetcher';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  const playlists = await spotifyFetcher(
    'https://api.spotify.com/v1/me/playlists',
    session
  );

  res.status(200).json(playlists);
};

export default handler;
