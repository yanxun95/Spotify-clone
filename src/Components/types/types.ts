export type artistDetails = {
  id: number;
  link?: string;
  name: string;
  nb_album?: number;
  nb_fan?: number;
  picture: string;
  picture_big: string;
  picture_medium: string;
  picture_small: string;
  picture_xl: string;
  radio?: boolean;
  share?: string;
  tracklist: string;
  type: string;
  role?: string;
};

export type albumDetails = {
  cover: string;
  cover_big?: string;
  cover_medium: string;
  cover_small: string;
  cover_xl: string;
  id: number;
  md5_image: string;
  title: string;
  tracklist: string;
  type: string;
};

export interface songsDetails {
  album: albumDetails;
  artist: artistDetails;
  duration: number;
  explicit_content_cover: number;
  explicit_content_lyrics: number;
  explicit_lyrics: boolean;
  id: number;
  link: string;
  md5_image: string;
  preview: string;
  rank: number;
  readable: boolean;
  title: string;
  title_short: string;
  title_version: string;
  type: string;
}

export interface albumMoreDeatils {
  artist: artistDetails;
  available: boolean;
  contributors: Array<artistDetails>;
  cover: string;
  cover_big: string;
  cover_medium: string;
  cover_small: string;
  cover_xl: string;
  duration: number;
  explicit_content_cover: number;
  explicit_content_lyrics: number;
  explicit_lyrics: boolean;
  fans: number;
  genre_id: number;
  genres: genres;
  id: number;
  label: string;
  link: string;
  md5_image: string;
  nb_tracks: number;
  record_type: string;
  release_date: string;
  share: string;
  title: string;
  tracklist: string;
  tracks: tracks;
  type: string;
  upc: string;
}

interface tracks {
  data: Array<smallSongDetails>;
}

export interface genres {
  data: Array<genersDetails>;
}

export type genersDetails = {
  id: number;
  name: string;
  picture: string;
  type: string;
};

export type smallSongDetails = {
  artist: artistDetails;
  duration: number;
  explicit_content_cover: number;
  explicit_content_lyrics: number;
  explicit_lyrics: boolean;
  id: number;
  link: string;
  md5_image: string;
  preview: string;
  rank: number;
  readable: boolean;
  title: string;
  title_short: string;
  title_version: string;
  type: string;
};
