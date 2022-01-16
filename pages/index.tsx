import { useSession, signIn, signOut } from 'next-auth/react';

import { CALLBACK_URL } from '../src/constants/urls';

const IndexPage = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
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
