import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LanguageController } from './languages.controller';
import { LanguageService } from './languages.service';
import { Language, LanguageSchema } from './entities/language.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Language.name, schema: LanguageSchema }])],
  controllers: [LanguageController],
  providers: [LanguageService],
})
export class LanguageModule {}
