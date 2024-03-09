import { CreateAlbumDto } from 'src/dto/albumDTO';
import { CreateArtistDto } from 'src/dto/artistDTO';
import { CreateTrackDto } from 'src/dto/trackDTO';
import { CreateUserDto, UpdatePasswordDto } from 'src/dto/userDTO';

const FieldsMap = {
  user: [
    { value: 'login', type: ['string'] },
    { value: 'password', type: ['string'] },
  ],
  password: [
    { value: 'oldPassword', type: ['string'] },
    { value: 'newPassword', type: ['string'] },
  ],
  track: [
    { value: 'name', type: ['string'] },
    { value: 'artistId', type: ['string', 'object'] },
    { value: 'albumId', type: ['string', 'object'] },
    { value: 'duration', type: ['number'] },
  ],
  artist: [
    { value: 'name', type: ['string'] },
    { value: 'grammy', type: ['boolean'] },
  ],
  album: [
    { value: 'name', type: ['string'] },
    { value: 'artistId', type: ['string', 'object'] },
    { value: 'year', type: ['number'] },
  ],
};

type Obj =
  | CreateUserDto
  | CreateTrackDto
  | CreateArtistDto
  | CreateAlbumDto
  | UpdatePasswordDto;

export function hasAllFields(obj: Obj, map: keyof typeof FieldsMap) {
  const fields = FieldsMap[map];

  if (fields.length !== Object.keys(obj).length) {
    return false;
  }

  for (const { value, type } of fields) {
    if (!(value in obj) || !type.some((i: string) => i === typeof obj[value])) {
      return false;
    }
  }
  return true;
}
