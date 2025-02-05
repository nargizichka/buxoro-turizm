import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class AboutUs extends Document {
  @Prop({ type: Object, required: true })
  @ApiProperty({
    description: 'Project haqida',
    example: {
      uz: 'Project haqida',
      en: 'Project haqida',
      ru: 'Project haqida',
      tk: 'Project haqida',
      sa: 'Project haqida',
    },
    type: String,
  })
  aboutProject: { uz: string; en: string; ru: string; tk: string; sa: string };

  @Prop({ type: Object, required: true })
  @ApiProperty({
    description: 'Project maqsadi',
    example: {
      uz: 'Project maqsadi',
      en: 'Project maqsadi',
      ru: 'Project maqsadi',
      tk: 'Project maqsadi',
      sa: 'Project maqsadi',
    },
    type: String,
  })
  purposeOfTheProject: { uz: string; en: string; ru: string; tk: string; sa: string };

  @Prop({ type: Object, required: true })
  @ApiProperty({
    description: 'About us',
    example: {
      uz: 'About us',
      en: 'About us',
      ru: 'About us',
      tk: 'About us',
      sa: 'About us',
    },
    type: String,
  })
  about: { uz: string; en: string; ru: string; tk: string; sa: string };

  @Prop({ type: String, required: true })
  @ApiProperty({
    description: 'About us rasmi',
    example: 'About us rasmi',
    type: String,
  })
  aboutImg: string;
}

export const AboutUsSchema = SchemaFactory.createForClass(AboutUs);
