import { CreateTrackDto } from 'src/track/dto/trackDTO';
import { Track } from 'src/track/types/track';
import { v4 as uuidv4 } from 'uuid';

let tracks: Track[] = [];

export const getAllTracks = () => {
  return tracks;
};

export const getTrackById = (id: string): Track => {
  const track = tracks.find((track) => track.id === id);
  return track;
};

export const createTrack = (dto: CreateTrackDto): Track => {
  const newTrack = {
    id: uuidv4(), // uuid v4
    ...dto,
  };

  tracks.push(newTrack);

  return newTrack;
};

export const updateTrack = (trackId: string, dto: CreateTrackDto) => {
  const trackIndex = tracks.findIndex((track) => track.id === trackId);

  tracks[trackIndex] = {
    ...tracks[trackIndex],
    ...dto,
  };

  return tracks[trackIndex];
};

export const deleteTrack = (trackId: string) => {
  tracks = tracks.filter((track) => trackId !== track.id);
};

export const isTrackExist = (trackId: string): boolean => {
  const track = tracks.find((track) => track.id === trackId);
  return !!track;
};

export const deleteArtistFromTrack = (artistId: string) => {
  const track = tracks.find((track) => track.artistId === artistId);
  if (track) {
    track.artistId = null;
  }
};

export const deleteAlbumFromTrack = (albumId: string) => {
  const track = tracks.find((track) => track.albumId === albumId);
  if (track) {
    track.albumId = null;
  }
};
