import { Track } from 'src/interfaces/track';

export type CreateTrackDto = Omit<Track, 'id'>;
