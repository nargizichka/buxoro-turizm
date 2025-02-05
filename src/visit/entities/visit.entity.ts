import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Visit extends Document {
  @Prop({ default: 0 })
  @ApiProperty({
    description: 'Mahalliy tashriflar',
    example: 0,
    type: Number,
  })
  nationalVisits: number; // Mahalliy tashriflar

  @Prop({ default: 0 })
  @ApiProperty({
    description: 'Xalqaro tashriflar',
    example: 0,
    type: Number,
  })
  internationalVisits: number; // Xalqaro tashriflar
}

export const VisitSchema = SchemaFactory.createForClass(Visit);
