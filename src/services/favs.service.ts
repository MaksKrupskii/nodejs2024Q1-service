import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { isAlbumExist } from 'src/db/albumDB';
import { isArtistExist } from 'src/db/artistDB';
import {
  addAlbumToFavorites,
  addArtistToFavorites,
  addTrackToFavorites,
  deleteAlbumFromFavorites,
  deleteArtistFromFavorites,
  deleteTrackFromFavorites,
  getAllFavorites,
  isAlbumInFav,
  isArtistInFav,
  isTrackInFav,
} from 'src/db/favoritesDb';
import { isTrackExist } from 'src/db/trackDB';
import { FavoritesResponse } from 'src/interfaces/favorites';
import { isUUID } from 'src/utils/uuid';

@Injectable()
export class FavsService {
  getAll(): FavoritesResponse {
    return getAllFavorites();
  }

  addArtist(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('artistId is invalid', HttpStatus.BAD_REQUEST);
    }
    if (!isArtistExist(id)) {
      throw new HttpException(
        "artist doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    addArtistToFavorites(id);
  }

  deleteArtist(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('artistId is invalid', HttpStatus.BAD_REQUEST);
    }
    if (!isArtistInFav(id)) {
      throw new HttpException(
        'corresponding artist is not favorite',
        HttpStatus.NOT_FOUND,
      );
    }
    deleteArtistFromFavorites(id);
  }

  addAlbum(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('albumId is invalid', HttpStatus.BAD_REQUEST);
    }
    if (!isAlbumExist(id)) {
      throw new HttpException(
        "album doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    addAlbumToFavorites(id);
  }

  deleteAlbum(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('albumId is invalid', HttpStatus.BAD_REQUEST);
    }
    if (!isAlbumInFav(id)) {
      throw new HttpException(
        'corresponding album is not favorite',
        HttpStatus.NOT_FOUND,
      );
    }
    deleteAlbumFromFavorites(id);
  }

  addTrack(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('trackId is invalid', HttpStatus.BAD_REQUEST);
    }
    if (!isTrackExist(id)) {
      throw new HttpException(
        "track doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    addTrackToFavorites(id);
  }

  deleteTrack(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('trackId is invalid', HttpStatus.BAD_REQUEST);
    }
    if (!isTrackInFav(id)) {
      throw new HttpException(
        'corresponding track is not favorite',
        HttpStatus.NOT_FOUND,
      );
    }
    deleteTrackFromFavorites(id);
  }
}
