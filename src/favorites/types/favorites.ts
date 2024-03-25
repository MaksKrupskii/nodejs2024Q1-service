import { Album } from '../../album/types/album';
import { Artist } from '../../artist/types/artist';
import { Track } from '../../track/types/track';

export interface Favorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
