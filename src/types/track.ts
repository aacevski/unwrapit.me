export type Track = {
  album: {
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
};

export type Tracks = {
  items: Track[];
};
