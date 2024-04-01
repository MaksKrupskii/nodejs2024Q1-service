import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from 'src/artist/dto/artistDTO';
import { Artist } from 'src/artist/types/artist';
import prisma from 'src/prismaClient/prismaClient';
import { isUUID } from 'src/utils/uuid';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ArtistService {
  async getAll(): Promise<Artist[]> {
    return await prisma.artist.findMany();
  }

  async getById(id: string): Promise<Artist> {
    if (!isUUID(id)) {
      throw new HttpException('artistId is invalid', HttpStatus.BAD_REQUEST);
    }
    const artist = await prisma.artist.findFirst({
      where: { id },
    });

    if (!artist) {
      throw new HttpException("artist doesn't exist", HttpStatus.NOT_FOUND);
    } else {
      return artist;
    }
  }

  async createArtist(createArtistDto: CreateArtistDto): Promise<Artist> {
    const newArtist = await prisma.artist.create({
      data: {
        id: uuidv4(),
        ...createArtistDto,
      },
    });
    return newArtist;
  }

  async updateArtist(id: string, updateArtistDto: CreateArtistDto) {
    if (!isUUID(id)) {
      throw new HttpException('artistId is invalid', HttpStatus.BAD_REQUEST);
    }

    const artist = await prisma.artist.findFirst({ where: { id } });

    if (!artist) {
      throw new HttpException("artist doesn't exist", HttpStatus.NOT_FOUND);
    } else {
      return await prisma.artist.update({
        where: { id },
        data: {
          ...artist,
          ...updateArtistDto,
        },
      });
    }
  }

  async deleteArtist(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('artistId is invalid', HttpStatus.BAD_REQUEST);
    }
    const artist = await prisma.artist.findFirst({ where: { id } });

    if (!artist) {
      throw new HttpException("artist doesn't exist", HttpStatus.NOT_FOUND);
    }
    await prisma.artist.delete({ where: { id } });
    await prisma.album.updateMany({
      where: { artistId: id },
      data: { artistId: null },
    });
    await prisma.track.updateMany({
      where: { artistId: id },
      data: { artistId: null },
    });
  }
}
