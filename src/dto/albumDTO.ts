import { Album } from 'src/interfaces/album';

export type CreateAlbumDto = Omit<Album, 'id'>;
