import { useSession, signIn, signOut } from 'next-auth/react';
import { Player } from '@remotion/player';

import HelloWorld from '../src/remotion/hello-word';
import { CALLBACK_URL } from '../src/constants/urls';

const IndexPage = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
        <Player
          component={HelloWorld}
          durationInFrames={120}
          compositionWidth={1920}
          compositionHeight={1080}
          fps={30}
          style={{
            width: 1280,
            height: 720,
          }}
          controls
          inputProps={{
            text: 'world',
          }}
        />
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn('spotify', { callbackUrl: CALLBACK_URL })}>
        Sign in
      </button>
    </>
  );
};

export default IndexPage;
