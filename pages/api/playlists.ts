import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import { Session } from '../../src/types/session';
import fetcher from '../../src/utils/fetcher';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = (await getSession({ req })) as Session;

  const playlists = await fetcher(`https://api.spotify.com/v1/me/playlists`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`,
    },
  });

  res.status(200).json(playlists);
};

export default handler;