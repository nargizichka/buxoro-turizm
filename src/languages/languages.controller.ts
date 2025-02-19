import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { LanguageService } from './languages.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { Language } from './entities/language.entity';
import { NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'; // Import API decorators

@ApiTags('language') 
@Controller('languages')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new language' })
  @ApiResponse({ status: 201, description: 'Language successfully created', type: Language })
  async create(@Body() createLanguageDto: CreateLanguageDto): Promise<Language> {
    const createdLanguage = await this.languageService.create(createLanguageDto);
    return createdLanguage;
  }

  @Get()
  @ApiOperation({ summary: 'Get all languages' })
  @ApiResponse({ status: 200, description: 'List of all languages', type: Language })
  async findAll(): Promise<Language[]> {
    return this.languageService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a language by id' })
  @ApiResponse({ status: 200, description: 'The found language', type: Language })
  @ApiResponse({ status: 404, description: 'Language not found' })
  async findOne(@Param('id') id: string): Promise<Language> {
    const language = await this.languageService.findOne(id);
    if (!language) {
      throw new NotFoundException('Language not found');
    }
    return language;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a language by id' })
  @ApiResponse({ status: 200, description: 'Language successfully updated', type: Language })
  @ApiResponse({ status: 404, description: 'Language not found' })
  async update(
    @Param('id') id: string,
    @Body() updateLanguageDto: CreateLanguageDto,
  ): Promise<Language> {
    const updatedLanguage = await this.languageService.update(id, updateLanguageDto);
    if (!updatedLanguage) {
      throw new NotFoundException('Language not found');
    }
    return updatedLanguage;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a language by id' })
  @ApiResponse({ status: 200, description: 'Language successfully deleted' })
  @ApiResponse({ status: 404, description: 'Language not found' })
  async remove(@Param('id') id: string): Promise<any> {
    const result = await this.languageService.remove(id);
    if (!result) {
      throw new NotFoundException('Language not found');
    }
    return result;
  }
}
