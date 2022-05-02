import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import { Session } from '../../src/types/session';
import fetcher from '../../src/api/fetcher';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).send({ message: 'Only GET method is allowed.' });
    return;
  }

  const session = (await getSession({ req })) as Session;

  const user = await fetcher(`https://api.spotify.com/v1/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`,
    },
  });

  res.status(200).json(user);
};

export default handler;
