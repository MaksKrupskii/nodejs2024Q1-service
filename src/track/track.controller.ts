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
import { CreateTrackDto } from 'src/track/dto/trackDTO';
import { Track } from 'src/track/types/track';
import { TrackService } from 'src/track/track.service';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}
  @Get()
  async findAll(): Promise<Track[]> {
    return await this.trackService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Track> {
    return await this.trackService.getById(id);
  }

  @Post()
  async create(@Body() createTrackDto: CreateTrackDto): Promise<Track> {
    return await this.trackService.createTrack(createTrackDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTrackDto: CreateTrackDto,
  ) {
    return await this.trackService.updateTrack(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    return await this.trackService.deleteTrack(id);
  }
}
