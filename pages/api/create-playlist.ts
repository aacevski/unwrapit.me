import type { NextApiRequest, NextApiResponse } from 'next';
import * as fs from 'fs';
import { getSession } from 'next-auth/react';

import { Session } from '~types/session';
import fetcher from '~api/fetcher';
import parseTimePeriod from '~utils/parse-time-period';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST method is allowed.' });
    return;
  }

  const session = (await getSession({ req })) as Session;
  const trackUris = JSON.parse(req.body).trackUris;
  const timePeriod = parseTimePeriod(JSON.parse(req.body).timePeriod);
  const playlistImageEncoded = fs.readFileSync(
    './src/data/playlist_image_encoded.txt',
    'utf8'
  );

  const createPlaylist = await fetcher(
    `https://api.spotify.com/v1/users/${session?.user?.sub}/playlists`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
      body: JSON.stringify({
        name: `unwrapit.me - ${timePeriod}`,
        description:
          'This playlist has been generated by unwrapit.me. It is a curated list of tracks that you like. <3',
        public: true,
      }),
    }
  );

  const updatePlaylist = await fetcher(
    `https://api.spotify.com/v1/playlists/${createPlaylist.id}/tracks`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
      body: JSON.stringify({
        uris: trackUris,
      }),
    }
  );

  res.status(200).json(createPlaylist && updatePlaylist);
};

export default handler;
