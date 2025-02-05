import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type ZiyoratgohDocument = Ziyoratgoh & Document;

@Schema()
export class Ziyoratgoh {
  @Prop({ type: Object, required: true })
  @ApiProperty({
    description: 'Ziyoratgohning nomi',
    example: {
      uz: 'string',
      en: 'string',
      ru: 'string',
      sa: 'string',
      tk: 'string',
    },
    type: String,
  })
  name: { uz: string; en: string; ru: string; sa: string; tk: string };

  @Prop({ type: Object, required: true })
  @ApiProperty({
    description: 'Ziyoratgohning tavsifi',
    example: {
      uz: 'string',
      en: 'string',
      ru: 'string',
      sa: 'string',
      tk: 'string',
    },
    type: String,
  })
  description: { uz: string; en: string; ru: string; sa: string; tk: string };

  @Prop()
  @ApiProperty({
    description: 'Ziyoratgohning nomi',
    example: 'link',
    type: String,
  })
  threeD: string;

  @Prop()
  @ApiProperty({
    description: 'Ziyoratgohning nomi',
    example: 'link',
    type: String,
  })
  location: string;

  @Prop()
  @ApiProperty({
    description: 'Ziyoratgohning nomi',
    example: 'link',
    type: String,
  })
  youtubeLink?: string;

  @Prop()
  @ApiProperty({
    description: 'Ziyoratgohning nomi',
    example: 'file',
    type: String,
  })
  mainImage: string;

  @Prop({ type: [String] })
  @ApiProperty({
    description: 'Ziyoratgohning nomi',
    example: 'files',
    type: String,
  })
  additionalImages?: string[];
}

export const ZiyoratgohSchema = SchemaFactory.createForClass(Ziyoratgoh);
