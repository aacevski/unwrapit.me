export type Artist = {
  images: [
    {
      url: string;
    }
  ];
  name: string;
  genres: string[];
  external_urls: {
    spotify: string;
  };
};

export type Artists = {
  items: Artist[];
};
