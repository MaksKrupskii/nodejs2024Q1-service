import { FavoritesResponse } from 'src/interfaces/favorites';
import { getAlbumById } from './albumDB';
import { getTrackById } from './trackDB';
import { getArtistById } from './artistDB';

const favorites: FavoritesResponse = {
  artists: [],
  albums: [],
  tracks: [],
};

export const getAllFavorites = (): FavoritesResponse => {
  return favorites;
};

export const addTrackToFavorites = (id: string) => {
  const track = getTrackById(id);
  favorites.tracks.push(track);
};

export const isTrackInFav = (id: string) => {
  const track = favorites.tracks.find((track) => track.id === id);

  return !!track;
};

export const deleteTrackFromFavorites = (id: string) => {
  favorites.tracks = favorites.tracks.filter((track) => track.id !== id);
};

export const addAlbumToFavorites = (id: string) => {
  const album = getAlbumById(id);
  favorites.albums.push(album);
};

export const isAlbumInFav = (id: string) => {
  const album = favorites.albums.find((album) => album.id === id);

  return !!album;
};

export const deleteAlbumFromFavorites = (id: string) => {
  favorites.albums = favorites.albums.filter((album) => album.id !== id);
};

export const addArtistToFavorites = (id: string) => {
  const artist = getArtistById(id);
  favorites.artists.push(artist);
};

export const isArtistInFav = (id: string) => {
  const artist = favorites.artists.find((artist) => artist.id === id);

  return !!artist;
};

export const deleteArtistFromFavorites = (id: string) => {
  favorites.artists = favorites.artists.filter((artist) => artist.id !== id);
};
