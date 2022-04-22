export type Artist = {
  images: [
    {
      url: string;
    }
  ];
  name: string;
  genres: string[];
};

export type Artists = {
  items: Artist[];
};
