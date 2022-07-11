import type { NextApiRequest, NextApiResponse } from 'next';
import {
  AwsRegion,
  deploySite,
  getFunctions,
  getOrCreateBucket,
  getRenderProgress,
  renderMediaOnLambda,
  RenderProgress,
} from '@remotion/lambda';
import path from 'path';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST method is allowed.' });
    return;
  }

  // const functions = await getFunctions({
  // region: 'us-east-1',
  // compatibleOnly: true,
  // });

  // const [lambda] = functions;

  // const { renderId, bucketName } = await renderMediaOnLambda({
  //   region: 'us-east-1',
  //   functionName: lambda.functionName,
  //   serveUrl:
  //     'https://remotionlambda-cg3id6prlk.s3.us-east-1.amazonaws.com/sites/d47jpvzyvk/index.html',
  //   composition: 'scenes',
  //   codec: 'h264-mkv',
  //   imageFormat: 'jpeg',
  //   maxRetries: 1,
  //   framesPerLambda: 30,
  //   privacy: 'public',
  //   inputProps: {
  //     artist: artists?.items[0],
  //     track: tracks?.items[0],
  //     genres,
  //     trackUris,
  //   },
  //   chromiumOptions: {
  //     headless: false,
  //   },
  // });

  res.status(200).json({});
};

export default handler;
