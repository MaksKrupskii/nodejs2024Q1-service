import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { Album } from 'src/album/types/album';
import { ArtistService } from 'src/artist/artist.service';
import { Artist } from 'src/artist/types/artist';
import prisma from 'src/prismaClient/prismaClient';
import { TrackService } from 'src/track/track.service';
import { Track } from 'src/track/types/track';
import { excludeField } from 'src/utils/excludeField';
import { isUUID } from 'src/utils/uuid';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  formatResult(array: Album[] | Track[] | Artist[]) {
    return array.map((item) => excludeField(item, ['isFavorite']));
  }

  async getAll() {
    const tracks = await prisma.track.findMany({
      where: { isFavorite: true },
    });
    const albums = await prisma.album.findMany({
      where: { isFavorite: true },
    });
    const artists = await prisma.artist.findMany({
      where: { isFavorite: true },
    });
    return {
      tracks: this.formatResult(tracks),
      albums: this.formatResult(albums),
      artists: this.formatResult(artists),
    };
  }

  async addArtist(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('artistId is invalid', HttpStatus.BAD_REQUEST);
    }
    const artist = await prisma.artist.findFirst({
      where: { id },
    });

    if (!artist) {
      throw new HttpException(
        "artist doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    await prisma.artist.update({
      where: { id },
      data: { isFavorite: true },
    });
  }

  async deleteArtist(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('artistId is invalid', HttpStatus.BAD_REQUEST);
    }
    const artist = await prisma.artist.findFirst({ where: { id } });

    if (!artist?.isFavorite) {
      throw new HttpException(
        'corresponding artist is not favorite',
        HttpStatus.NOT_FOUND,
      );
    }

    await prisma.artist.update({
      where: { id },
      data: { isFavorite: false },
    });
  }

  async addAlbum(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('albumId is invalid', HttpStatus.BAD_REQUEST);
    }
    const album = await prisma.album.findFirst({
      where: { id },
    });

    if (!album) {
      throw new HttpException(
        "album doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    await prisma.album.update({
      where: { id },
      data: { isFavorite: true },
    });
  }

  async deleteAlbum(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('albumId is invalid', HttpStatus.BAD_REQUEST);
    }
    const album = await prisma.album.findFirst({ where: { id } });

    if (!album?.isFavorite) {
      throw new HttpException(
        'corresponding album is not favorite',
        HttpStatus.NOT_FOUND,
      );
    }

    await prisma.album.update({
      where: { id },
      data: { isFavorite: false },
    });
  }

  async addTrack(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('trackId is invalid', HttpStatus.BAD_REQUEST);
    }
    const track = await prisma.track.findFirst({
      where: { id },
    });

    if (!track) {
      throw new HttpException(
        "track doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    await prisma.track.update({
      where: { id },
      data: { isFavorite: true },
    });
  }

  async deleteTrack(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('trackId is invalid', HttpStatus.BAD_REQUEST);
    }
    const track = await prisma.track.findFirst({ where: { id } });
    if (!track?.isFavorite) {
      throw new HttpException(
        'corresponding track is not favorite',
        HttpStatus.NOT_FOUND,
      );
    }

    await prisma.track.update({
      where: { id },
      data: { isFavorite: false },
    });
  }
}
