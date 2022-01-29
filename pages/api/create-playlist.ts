import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import { Session } from '../../src/types/session';
import fetcher from '../../src/utils/fetcher';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = (await getSession({ req })) as Session;

  const createPlaylist = await fetcher(
    `https://api.spotify.com/v1/users/${session?.user?.sub}/playlists`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
      body: JSON.stringify({
        name: 'unwrapped.me',
        description:
          'This playlist has been generated by unwrapped.me. It is a curated list of tracks that you like. <3',
        public: true,
      }),
    }
  );

  res.status(200).json(createPlaylist);
};

export default handler;