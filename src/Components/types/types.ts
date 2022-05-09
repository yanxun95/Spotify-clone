export type artistDetails = {
  id: number;
  link?: string;
  name: string;
  nb_album?: number;
  nb_fan?: number;
  picture: string;
  picture_big?: string;
  picture_medium?: string;
  picture_small?: string;
  picture_xl?: string;
  radio?: boolean;
  share?: string;
  tracklist: string;
  type: string;
};

export type albumDetails = {
  cover: string;
  cover_big: string;
  cover_medium: string;
  cover_small: string;
  cover_xl: string;
  id: number;
  md5_image: string;
  title: string;
  tracklist: string;
  type: string;
};
