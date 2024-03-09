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
import { CreateArtistDto } from 'src/dto/artistDTO';
import { Artist } from 'src/interfaces/artist';
import { ArtistService } from 'src/services/artist.service';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  findAll(): Artist[] {
    return this.artistService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Artist {
    return this.artistService.getById(id);
  }

  @Post()
  create(@Body() createArtistDto: CreateArtistDto): Artist {
    return this.artistService.createArtist(createArtistDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateArtistDto: CreateArtistDto) {
    return this.artistService.updateArtist(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    return this.artistService.deleteArtist(id);
  }
}
