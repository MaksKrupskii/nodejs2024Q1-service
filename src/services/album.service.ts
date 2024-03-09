import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  createAlbum,
  deleteAlbum,
  getAlbumById,
  getAllAlbums,
  isAlbumExist,
  updateAlbum,
} from 'src/db/albumDB';
import { deleteAlbumFromFavorites } from 'src/db/favoritesDb';
import { CreateAlbumDto } from 'src/dto/albumDTO';
import { Album } from 'src/interfaces/album';
import { hasAllFields } from 'src/utils/hasAllFields';
import { isUUID } from 'src/utils/uuid';

@Injectable()
export class AlbumService {
  getAll(): Album[] {
    return getAllAlbums();
  }

  getById(id: string): Album {
    if (!isUUID(id)) {
      throw new HttpException('albumId is invalid', HttpStatus.BAD_REQUEST);
    }
    if (!isAlbumExist(id)) {
      throw new HttpException("album doesn't exist", HttpStatus.NOT_FOUND);
    }

    const album = getAlbumById(id);
    return album;
  }

  createAlbum(createAlbumDto: CreateAlbumDto): Album {
    if (hasAllFields(createAlbumDto, 'album')) {
      const newAlbum = createAlbum(createAlbumDto);
      return newAlbum;
    } else {
      throw new HttpException(
        'body does not contain required fields',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  updateAlbum(id: string, updateAlbumDto: CreateAlbumDto) {
    if (!isUUID(id) || !hasAllFields(updateAlbumDto, 'album')) {
      throw new HttpException('albumId is invalid', HttpStatus.BAD_REQUEST);
    }
    if (!isAlbumExist(id)) {
      throw new HttpException("album doesn't exist", HttpStatus.NOT_FOUND);
    }

    return updateAlbum(id, updateAlbumDto);
  }

  deleteAlbum(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('albumId is invalid', HttpStatus.BAD_REQUEST);
    }
    if (!isAlbumExist(id)) {
      throw new HttpException("album doesn't exist", HttpStatus.NOT_FOUND);
    }
    deleteAlbum(id);
    deleteAlbumFromFavorites(id);
  }
}
