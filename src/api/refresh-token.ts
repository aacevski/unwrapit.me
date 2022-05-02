export const refreshToken = async (token: any) => {
  const res = await fetch(`https://accounts.spotify.com/api/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_ID}:${process.env.SPOTIFY_SECRET}`
      ).toString('base64')}`,
    },
    body: `grant_type=refresh_token&refresh_token=${token.refreshToken}`,
  });
  const data = await res.json();

  return {
    ...token,
    accessToken: data.access_token,
  };
};

export default refreshToken;
