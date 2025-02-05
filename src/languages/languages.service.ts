import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLanguageDto } from './dto/create-language.dto';
import { Language } from './entities/language.entity';

@Injectable()
export class LanguageService {
  constructor(
    @InjectModel(Language.name) private languageModel: Model<Language>,
  ) {}

  // Create a new language
  async create(createLanguageDto: CreateLanguageDto): Promise<Language> {
    const createdLanguage = new this.languageModel(createLanguageDto);
    return createdLanguage.save();
  }

  // Get all languages
  async findAll(): Promise<Language[]> {
    return this.languageModel.find().exec();
  }

  // Get a language by id
  async findOne(id: string): Promise<Language | null> {
    return this.languageModel.findById(id).exec();
  }

  // Update a language
async update(id: string, updateLanguageDto: CreateLanguageDto): Promise<Language> {
  const updatedLanguage = await this.languageModel
    .findByIdAndUpdate(id, updateLanguageDto, { new: true })
    .lean(); // Using .lean() here
  if (!updatedLanguage) {
    throw new Error('Language not found');
  }
  return updatedLanguage; // Will be a plain object, no Mongoose document
}


  // Delete a language
  async remove(id: string): Promise<any> {
    return this.languageModel.findByIdAndDelete(id).exec();
  }
}
