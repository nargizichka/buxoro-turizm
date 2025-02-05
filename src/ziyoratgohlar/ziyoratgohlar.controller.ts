import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  UploadedFiles,
  UseInterceptors,
  Body,
  Req,
  BadRequestException,
  Query
} from '@nestjs/common';
import { Request } from 'express';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ziyoratgoh, ZiyoratgohDocument } from './entities/ziyoratgohlar.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Ziyoratgohlar')
@Controller('ziyoratgohlar')
export class ZiyoratgohlarController {
  constructor(@InjectModel(Ziyoratgoh.name) private readonly model: Model<ZiyoratgohDocument>) {}

  // 📌 [POST] - Ma'lumot qo‘shish
  @Post()
  @ApiOperation({ summary: 'Ziyoratgoh qo‘shish' })
  @ApiResponse({ status: 200, description: 'Ziyoratgoh muvaffaqiyatli qo‘shildi.', type: Ziyoratgoh, })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'mainImage', maxCount: 1 },
      { name: 'additionalImages', maxCount: 5 },
    ], {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
        },
      }),
    })
  )
  async create(
    @UploadedFiles() files: { mainImage?: Express.Multer.File[], additionalImages?: Express.Multer.File[] },
    @Req() req: Request
  ) {
    const body = req.body; 
  
    const newZiyoratgoh = new this.model({
      name: {
        uz: body['name.uz'],
        en: body['name.en'],
        ru: body['name.ru'],
        sa: body['name.sa'],
        tk: body['name.tk'],
      },
      description: {
        uz: body['description.uz'],
        en: body['description.en'],
        ru: body['description.ru'],
        sa: body['description.sa'],
        tk: body['description.tk'],
      },
      threeD: body['threeD'] || null,
      location: body['location'] || null,
      youtubeLink: body['youtubeLink'] || null,
      mainImage: files.mainImage?.[0]?.filename || null,
      additionalImages: files.additionalImages?.map(file => file.filename) || [],
    });
  
    await newZiyoratgoh.save();
  
    return {
      message: 'Muvaffaqiyatli yuklandi!',
      data: newZiyoratgoh
    };
  }
  
  
  @Get('search')
  @ApiOperation({ summary: 'Ziyoratgohlar qidirish' })
  @ApiResponse({ status: 200, description: 'Ziyoratgohlarni qidirish natijalari muvaffaqiyatli ko\'rsatilgan.' })
  async search(@Query('query') query: string) {
    if (!query) {
      throw new BadRequestException('Qidiruv so‘zi bo‘sh bo‘lishi mumkin emas');
    }
  
    const results = await this.model.find({
      $or: [
        { 'name.uz': { $regex: query, $options: 'i' } }, // Uzbek tilida qidirish
        { 'name.en': { $regex: query, $options: 'i' } }, // Ingliz tilida qidirish
        { 'name.ru': { $regex: query, $options: 'i' } },  // Rus tilida qidirish
        { 'name.tk': { $regex: query, $options: 'i' } },  // Rus tilida qidirish
        { 'name.sa': { $regex: query, $options: 'i' } }  // Rus tilida qidirish
      ]
    });
  
    return {
      message: 'Qidiruv natijalari',
      results
    };
  }
  

  // 📌 [GET] - Hammasini olish
  @Get()
  @ApiOperation({ summary: 'Barcha ziyoratgohlarni olish' })
  @ApiResponse({ status: 200, description: 'Barcha ziyoratgohlar muvaffaqiyatli ko\'rsatilgan.' })
  async getAll() {
    return await this.model.find();
  }

  // 📌 [GET] - ID orqali olish
  @Get(':id')
  @ApiOperation({ summary: 'Ziyoratgohni id orqali olish' })
  @ApiResponse({ status: 200, description: 'Ziyoratgoh muvaffaqiyatli ko\'rsatilgan.' })
  async getOne(@Param('id') id: string) {
    return await this.model.findById(id);
  }

  // 📌 [PUT] - Yangilash
  @Put(':id')
  @ApiOperation({ summary: 'Ziyoratgohni yangilash' })
  @ApiResponse({ status: 200, description: 'Ziyoratgoh muvaffaqiyatli yangilandi.', type: Ziyoratgoh, })
  async update(@Param('id') id: string, @Body() body: any) {
    const updatedZiyoratgoh = await this.model.findByIdAndUpdate(id, body, { new: true });
    return {
      message: 'Muvaffaqiyatli yangilandi!',
      data: updatedZiyoratgoh
    };
  }

  // 📌 [DELETE] - O‘chirish
  @Delete(':id')
  @ApiOperation({ summary: 'Ziyoratgohni o‘chirish',  })
  @ApiResponse({ status: 200, description: 'Ziyoratgoh muvaffaqiyatli o‘chirildi.', type: Ziyoratgoh })
  async delete(@Param('id') id: string) {
    await this.model.findByIdAndDelete(id);
    return {
      message: 'Muvaffaqiyatli o‘chirildi!'
    };
  }
}
