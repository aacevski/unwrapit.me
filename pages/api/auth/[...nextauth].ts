import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';
import refreshToken from '../../../src/utils/refresh-token';

const scope =
  'user-read-recently-played user-read-playback-state user-top-read user-modify-playback-state user-read-currently-playing user-follow-read playlist-read-private user-read-email user-read-private user-library-read playlist-read-collaborative playlist-modify-public playlist-modify-private';

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_ID || '',
      clientSecret: process.env.SPOTIFY_SECRET || '',
      authorization: {
        params: {
          scope,
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }: any) {
      if (account) {
        token.id = account.id;
        token.expiresAt = account.expires_at;
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;

        return token;
      }

      if (token) {
        if (Date.now() > token.expiresAt) {
          const refreshedToken = await refreshToken(token);

          return refreshedToken;
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
});
