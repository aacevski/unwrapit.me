import { useRouter } from 'next/router';
import { createContext, PropsWithChildren, useEffect, useState } from 'react';

import { useSession } from 'next-auth/react';
import { User } from '../types/user';

type UserContextProps = {
  user: User | null;
  timePeriod: string;
  setTimePeriod: (timePeriod: string) => void;
};

const authenticatedRoutes: string[] = [
  '/',
  '/profile',
  '/top-artists',
  '/top-tracks',
];

export const UserContext = createContext<UserContextProps>({
  user: null,
  timePeriod: 'long_term',
  setTimePeriod: () => {},
});

type Props = PropsWithChildren<{}>;

const UserProvider = ({ children }: Props) => {
  const { data: session } = useSession();
  const user: User | null = session?.user || null;
  const [timePeriod, setTimePeriod] = useState<string>('long_term');

  const { push, pathname } = useRouter();

  useEffect(() => {
    if (!user && authenticatedRoutes.includes(pathname)) {
      push('/login');
    } else if (user && !authenticatedRoutes.includes(pathname)) {
      push('/');
    } else {
      push(pathname);
    }
  }, [pathname, session]);

  return (
    <UserContext.Provider
      value={{
        user,
        timePeriod,
        setTimePeriod,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
