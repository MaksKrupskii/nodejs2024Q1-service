import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from 'src/track/dto/trackDTO';
import { Track } from 'src/track/types/track';
import prisma from 'src/prismaClient/prismaClient';
import { hasAllFields } from 'src/utils/hasAllFields';
import { isUUID } from 'src/utils/uuid';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TrackService {
  async getAll(): Promise<Track[]> {
    return await prisma.track.findMany();
  }

  async getById(id: string): Promise<Track> {
    if (!isUUID(id)) {
      throw new HttpException('trackId is invalid', HttpStatus.BAD_REQUEST);
    }
    const track = await prisma.track.findFirst({
      where: { id },
    });

    if (!track) {
      throw new HttpException("track doesn't exist", HttpStatus.NOT_FOUND);
    } else {
      return track;
    }
  }

  async createTrack(createTrackDto: CreateTrackDto): Promise<Track> {
    const newTrack = await prisma.track.create({
      data: {
        id: uuidv4(),
        ...createTrackDto,
      },
    });
    return newTrack;
  }

  async updateTrack(id: string, updateTrackDto: CreateTrackDto) {
    if (!isUUID(id)) {
      throw new HttpException('trackId is invalid', HttpStatus.BAD_REQUEST);
    }

    const track = await prisma.track.findFirst({ where: { id } });

    if (!track) {
      throw new HttpException("track doesn't exist", HttpStatus.NOT_FOUND);
    } else {
      return await prisma.track.update({
        where: { id },
        data: {
          ...track,
          ...updateTrackDto,
        },
      });
    }
  }

  async deleteTrack(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('trackId is invalid', HttpStatus.BAD_REQUEST);
    }
    const track = await prisma.track.findFirst({ where: { id } });

    if (!track) {
      throw new HttpException("track doesn't exist", HttpStatus.NOT_FOUND);
    }
    await prisma.track.delete({ where: { id } });
  }
}
