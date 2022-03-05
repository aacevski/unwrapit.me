export type SpotifyUser = {
  country: string;
  display_name: string;
  email: string;
  followers: {
    total: number;
  };
  id: string;
  images: [
    {
      url: string;
    }
  ];
};
