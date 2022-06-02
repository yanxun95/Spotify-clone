import {
  artistDetails,
  genres,
  songsDetails,
} from "../../Components/types/types";

export interface likeMoreDeatils {
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
  data: Array<songsDetails>;
}
