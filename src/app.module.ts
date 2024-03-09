import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TrackController } from './controllers/track.controller';
import { UserController } from './controllers/user.controller';
import { AlbumController } from './controllers/album.controller';
import { ArtistController } from './controllers/artist.controller';
import { FavsController } from './controllers/favs.controller';
import { UserService } from './services/user.service';
import { TrackService } from './services/track.service';
import { AlbumService } from './services/album.service';
import { ArtistService } from './services/artist.service';
import { FavsService } from './services/favs.service';

@Module({
  imports: [],
  controllers: [
    TrackController,
    UserController,
    AlbumController,
    ArtistController,
    FavsController,
  ],
  providers: [
    AppService,
    UserService,
    TrackService,
    AlbumService,
    ArtistService,
    FavsService,
  ],
})
export class AppModule {}
