import { Controller, Get, Post, Param, Delete, HttpCode } from '@nestjs/common';
import { FavoritesResponse } from 'src/interfaces/favorites';
import { FavsService } from 'src/services/favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  findAll(): FavoritesResponse {
    return this.favsService.getAll();
  }

  @Post('artist/:id')
  createArtist(@Param('id') id: string) {
    return this.favsService.addArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  deleteArtist(@Param('id') id: string) {
    return this.favsService.deleteArtist(id);
  }

  @Post('album/:id')
  createAlbum(@Param('id') id: string) {
    return this.favsService.addAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  deleteAlbum(@Param('id') id: string) {
    return this.favsService.deleteAlbum(id);
  }

  @Post('track/:id')
  createTrack(@Param('id') id: string) {
    return this.favsService.addTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  deleteTrack(@Param('id') id: string) {
    return this.favsService.deleteTrack(id);
  }
}
