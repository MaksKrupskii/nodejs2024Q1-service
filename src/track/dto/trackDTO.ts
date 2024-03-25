import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  duration: number;

  @IsOptional()
  @IsString()
  @IsUUID()
  albumId: string | null;

  @IsOptional()
  @IsString()
  @IsUUID()
  artistId: string | null;
}
