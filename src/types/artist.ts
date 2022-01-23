export type Artist = {
  images: [
    {
      url: string;
    }
  ];
  name: string;
};

export type Artists = {
  items: Artist[];
};
