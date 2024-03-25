import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { CreateAlbumDto } from 'src/dto/albumDTO';
import { Album } from 'src/interfaces/album';
import { AlbumService } from 'src/services/album.service';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  findAll(): Album[] {
    return this.albumService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Album {
    return this.albumService.getById(id);
  }

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto): Album {
    return this.albumService.createAlbum(createAlbumDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAlbumDto: CreateAlbumDto) {
    return this.albumService.updateAlbum(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    return this.albumService.deleteAlbum(id);
  }
}
