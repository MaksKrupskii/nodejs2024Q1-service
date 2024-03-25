import { Controller, Get, Post, Param, Delete, HttpCode } from '@nestjs/common';
import { FavoritesResponse } from 'src/favorites/types/favorites';
import { FavoritesService } from 'src/favorites/favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favsService: FavoritesService) {}

  @Get()
  findAll() {
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
