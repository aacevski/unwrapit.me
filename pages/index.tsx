import { useSession, signIn, signOut } from 'next-auth/react';

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
      <button
        onClick={() =>
          signIn('spotify', { callbackUrl: 'http://localhost:3000' })
        }
      >
        Sign in
      </button>
    </>
  );
};

export default IndexPage;
