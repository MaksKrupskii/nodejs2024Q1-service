import { Artist } from 'src/interfaces/artist';

export type CreateArtistDto = Omit<Artist, 'id'>;
