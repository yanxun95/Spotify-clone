import { albumDetails, artistDetails } from "../types/types";

export interface rowProps {
  title: string;
  artists?: Array<artistDetails>;
  albums?: Array<albumDetails>;
}
