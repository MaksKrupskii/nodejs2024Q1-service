import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  createArtist,
  deleteArtist,
  getAllArtists,
  getArtistById,
  isArtistExist,
  updateArtist,
} from 'src/db/artistDB';
import { deleteArtistFromFavorites } from 'src/db/favoritesDb';
import { CreateArtistDto } from 'src/dto/artistDTO';
import { Artist } from 'src/interfaces/artist';
import { hasAllFields } from 'src/utils/hasAllFields';
import { isUUID } from 'src/utils/uuid';

@Injectable()
export class ArtistService {
  getAll(): Artist[] {
    return getAllArtists();
  }

  getById(id: string): Artist {
    if (!isUUID(id)) {
      throw new HttpException('artistId is invalid', HttpStatus.BAD_REQUEST);
    }
    if (!isArtistExist(id)) {
      throw new HttpException("artist doesn't exist", HttpStatus.NOT_FOUND);
    }

    const artist = getArtistById(id);
    return artist;
  }

  createArtist(createArtistDto: CreateArtistDto): Artist {
    if (hasAllFields(createArtistDto, 'artist')) {
      const newArtist = createArtist(createArtistDto);
      return newArtist;
    } else {
      throw new HttpException(
        'body does not contain required fields',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  updateArtist(id: string, updateArtistDto: CreateArtistDto) {
    if (!isUUID(id) || !hasAllFields(updateArtistDto, 'artist')) {
      throw new HttpException('artistId is invalid', HttpStatus.BAD_REQUEST);
    }
    if (!isArtistExist(id)) {
      throw new HttpException("artist doesn't exist", HttpStatus.NOT_FOUND);
    }

    return updateArtist(id, updateArtistDto);
  }

  deleteArtist(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('artistId is invalid', HttpStatus.BAD_REQUEST);
    }
    if (!isArtistExist(id)) {
      throw new HttpException("artist doesn't exist", HttpStatus.NOT_FOUND);
    }
    deleteArtist(id);
    deleteArtistFromFavorites(id);
  }
}
