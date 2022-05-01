export type Track = {
  album: {
    name: string;
    images: [
      {
        url: string;
      }
    ];
  };
  artists: [
    {
      name: string;
    }
  ];
  name: string;
  uri: string;
  external_urls: {
    spotify: string;
  };
};

export type Tracks = {
  items: Track[];
};
