import { IsObject, IsString } from 'class-validator';

export class CreateAboutUsDto {
  @IsObject()
  aboutProject: { uz: string; en: string; ru: string; tk: string; sa: string };

  @IsObject()
  purposeOfTheProject: { uz: string; en: string; ru: string; tk: string; sa: string };

  @IsObject()
  about: { uz: string; en: string; ru: string; tk: string; sa: string };

  @IsString()
  aboutImg: string;
}
