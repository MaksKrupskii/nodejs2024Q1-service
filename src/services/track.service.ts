import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { deleteTrackFromFavorites } from 'src/db/favoritesDb';
import {
  createTrack,
  deleteTrack,
  getAllTracks,
  getTrackById,
  isTrackExist,
  updateTrack,
} from 'src/db/trackDB';
import { CreateTrackDto } from 'src/dto/trackDTO';
import { Track } from 'src/interfaces/track';
import { hasAllFields } from 'src/utils/hasAllFields';
import { isUUID } from 'src/utils/uuid';

@Injectable()
export class TrackService {
  getAll(): Track[] {
    return getAllTracks();
  }

  getById(id: string): Track {
    if (!isUUID(id)) {
      throw new HttpException('trackId is invalid', HttpStatus.BAD_REQUEST);
    }
    if (!isTrackExist(id)) {
      throw new HttpException("track doesn't exist", HttpStatus.NOT_FOUND);
    }

    const track = getTrackById(id);
    return track;
  }

  createTrack(createTrackDto: CreateTrackDto): Track {
    if (hasAllFields(createTrackDto, 'track')) {
      const newUser = createTrack(createTrackDto);
      return newUser;
    } else {
      throw new HttpException(
        'body does not contain required fields',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  updateTrack(id: string, updateTrackDto: CreateTrackDto) {
    if (!isUUID(id) || !hasAllFields(updateTrackDto, 'track')) {
      throw new HttpException('trackId is invalid', HttpStatus.BAD_REQUEST);
    }
    if (!isTrackExist(id)) {
      throw new HttpException("track doesn't exist", HttpStatus.NOT_FOUND);
    }

    return updateTrack(id, updateTrackDto);
  }

  deleteTrack(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('trackId is invalid', HttpStatus.BAD_REQUEST);
    }
    if (!isTrackExist(id)) {
      throw new HttpException("track doesn't exist", HttpStatus.NOT_FOUND);
    }
    deleteTrack(id);
    deleteTrackFromFavorites(id);
  }
}
