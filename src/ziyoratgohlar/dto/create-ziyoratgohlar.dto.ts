import { IsObject, IsString, IsUrl, IsArray, IsOptional } from 'class-validator';

export class CreateZiyoratgohDto {
  @IsObject()
  name: { [key: string]: string };

  @IsObject()
  description: { [key: string]: string };

  @IsString()
  threeD: string;

  @IsString()
  location: string;

  @IsString()
  @IsOptional()
  youtubeLink: string;
}
