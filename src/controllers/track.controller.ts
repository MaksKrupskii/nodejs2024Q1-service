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
import { CreateTrackDto } from 'src/dto/trackDTO';
import { Track } from 'src/interfaces/track';
import { TrackService } from 'src/services/track.service';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}
  @Get()
  findAll(): Track[] {
    return this.trackService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Track {
    return this.trackService.getById(id);
  }

  @Post()
  create(@Body() createTrackDto: CreateTrackDto): Track {
    return this.trackService.createTrack(createTrackDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTrackDto: CreateTrackDto) {
    return this.trackService.updateTrack(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    return this.trackService.deleteTrack(id);
  }
}
