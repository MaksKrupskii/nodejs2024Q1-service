import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from 'src/album/dto/albumDTO';
import { Album } from 'src/album/types/album';
import prisma from 'src/prismaClient/prismaClient';
import { hasAllFields } from 'src/utils/hasAllFields';
import { isUUID } from 'src/utils/uuid';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AlbumService {
  async getAll(): Promise<Album[]> {
    return await prisma.album.findMany();
  }

  async getById(id: string): Promise<Album> {
    if (!isUUID(id)) {
      throw new HttpException('albumId is invalid', HttpStatus.BAD_REQUEST);
    }
    const album = await prisma.album.findFirst({
      where: { id },
    });

    if (!album) {
      throw new HttpException("album doesn't exist", HttpStatus.NOT_FOUND);
    } else {
      return album;
    }
  }

  async createAlbum(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const newAlbum = await prisma.album.create({
      data: {
        id: uuidv4(),
        ...createAlbumDto,
      },
    });
    return newAlbum;
    // if (hasAllFields(createAlbumDto, 'album')) {
    //   const newAlbum = await prisma.album.create({
    //     data: {
    //       id: uuidv4(),
    //       ...createAlbumDto,
    //     },
    //   });
    //   return newAlbum;
    // } else {
    //   throw new HttpException(
    //     'body does not contain required fields',
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }
  }

  async updateAlbum(id: string, updateAlbumDto: CreateAlbumDto) {
    if (!isUUID(id)) {
      throw new HttpException('albumId is invalid', HttpStatus.BAD_REQUEST);
    }
    // if (!hasAllFields(updateAlbumDto, 'album')) {
    //   throw new HttpException(
    //     'body does not contain required fields',
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }
    const album = await prisma.album.findFirst({ where: { id } });

    if (!album) {
      throw new HttpException("album doesn't exist", HttpStatus.NOT_FOUND);
    } else {
      return await prisma.album.update({
        where: { id },
        data: {
          ...album,
          ...updateAlbumDto,
        },
      });
    }
  }

  async deleteAlbum(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('albumId is invalid', HttpStatus.BAD_REQUEST);
    }
    const album = await prisma.album.findFirst({ where: { id } });

    if (!album) {
      throw new HttpException("album doesn't exist", HttpStatus.NOT_FOUND);
    }
    await prisma.album.delete({ where: { id } });
    await prisma.track.updateMany({
      where: { albumId: id },
      data: { albumId: null },
    });
    // deleteAlbumFromFavorites(id);
  }
}
