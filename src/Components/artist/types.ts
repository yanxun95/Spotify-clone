import { artistDetails, albumDetails } from "../types/types";

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
