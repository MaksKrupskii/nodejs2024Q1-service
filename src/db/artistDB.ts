import { CreateArtistDto } from 'src/artist/dto/artistDTO';
import { Artist } from 'src/artist/types/artist';
import { v4 as uuidv4 } from 'uuid';
import { deleteArtistFromAlbum } from './albumDB';
import { deleteArtistFromTrack } from './trackDB';

let artists: Artist[] = [];

export const getAllArtists = () => {
  return artists;
};

export const getArtistById = (id: string): Artist => {
  const artist = artists.find((artist) => artist.id === id);
  return artist;
};

export const createArtist = (dto: CreateArtistDto): Artist => {
  const newArtist = {
    id: uuidv4(), // uuid v4
    ...dto,
  };

  artists.push(newArtist);

  return newArtist;
};

export const updateArtist = (artistId: string, dto: CreateArtistDto) => {
  const artistIndex = artists.findIndex((artist) => artist.id === artistId);

  artists[artistIndex] = {
    ...artists[artistIndex],
    ...dto,
  };

  return artists[artistIndex];
};

export const deleteArtist = (artistId: string) => {
  artists = artists.filter((artist) => artistId !== artist.id);
  deleteArtistFromAlbum(artistId);
  deleteArtistFromTrack(artistId);
};

export const isArtistExist = (artistId: string): boolean => {
  const artist = artists.find((artist) => artist.id === artistId);
  return !!artist;
};
