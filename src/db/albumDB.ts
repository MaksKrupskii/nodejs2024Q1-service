import { CreateAlbumDto } from 'src/dto/albumDTO';
import { Album } from 'src/interfaces/album';
import { v4 as uuidv4 } from 'uuid';
import { deleteAlbumFromTrack } from './trackDB';

let albums: Album[] = [];

export const getAllAlbums = () => {
  return albums;
};

export const getAlbumById = (id: string): Album => {
  const album = albums.find((album) => album.id === id);
  return album;
};

export const createAlbum = (dto: CreateAlbumDto): Album => {
  const newAlbum = {
    id: uuidv4(), // uuid v4
    ...dto,
  };

  albums.push(newAlbum);

  return newAlbum;
};

export const updateAlbum = (albumId: string, dto: CreateAlbumDto) => {
  const albumIndex = albums.findIndex((album) => album.id === albumId);

  albums[albumIndex] = {
    ...albums[albumIndex],
    ...dto,
  };

  return albums[albumIndex];
};

export const deleteAlbum = (albumId: string) => {
  albums = albums.filter((album) => albumId !== album.id);
  deleteAlbumFromTrack(albumId);
};

export const isAlbumExist = (albumId: string): boolean => {
  const album = albums.find((album) => album.id === albumId);
  return !!album;
};

export const deleteArtistFromAlbum = (artistId: string) => {
  const album = albums.find((album) => album.artistId === artistId);
  if (album) {
    album.artistId = null;
  }
};
