import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class Language extends Document {
  @Prop({ required: true })  
  @ApiProperty({
    description: 'Language name',
    example: 'English',
    type: String,
  })
  name: string;

  @Prop({ required: true }) 
  @ApiProperty({
    description: 'Language flag',
    example: '🇺🇸',
    type: String,
})
  flag: string;
}

export const LanguageSchema = SchemaFactory.createForClass(Language);