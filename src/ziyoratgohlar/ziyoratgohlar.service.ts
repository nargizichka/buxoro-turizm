import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ziyoratgoh, ZiyoratgohDocument } from './entities/ziyoratgohlar.entity';
import { CreateZiyoratgohDto } from './dto/create-ziyoratgohlar.dto';

@Injectable()
export class ZiyoratgohlarService {
  constructor(
    @InjectModel(Ziyoratgoh.name) private readonly ziyoratgohModel: Model<ZiyoratgohDocument>,
  ) {}

  async create(dto: CreateZiyoratgohDto, mainImage: Express.Multer.File, additionalImages?: Express.Multer.File[]): Promise<Ziyoratgoh> {
    const mainImageUrl = `/uploads/${mainImage.filename}`; // Fayl serverda saqlanadi, URL qaytariladi
    const additionalImagesUrls = additionalImages?.map(img => `/uploads/${img.filename}`) || [];

    const newZiyoratgoh = new this.ziyoratgohModel({
      ...dto,
      mainImage: mainImageUrl,
      additionalImages: additionalImagesUrls
    });

    return newZiyoratgoh.save();
  }

  async findAll(lang: string = 'uz'): Promise<any[]> {
    const ziyoratgohlar = await this.ziyoratgohModel.find().exec();
    return ziyoratgohlar.map(ziyoratgoh => ({
      id: ziyoratgoh._id,
      name: ziyoratgoh.name[lang] || ziyoratgoh.name['uz'],
      description: ziyoratgoh.description[lang] || ziyoratgoh.description['uz'],
      mainImage: ziyoratgoh.mainImage,
      additionalImages: ziyoratgoh.additionalImages,
    }));
  }

  async findOne(id: string, lang: string = 'uz'): Promise<any> {
    const ziyoratgoh = await this.ziyoratgohModel.findById(id).exec();
    if (!ziyoratgoh) throw new NotFoundException('Ziyoratgoh topilmadi');

    return {
      id: ziyoratgoh._id,
      name: ziyoratgoh.name[lang] || ziyoratgoh.name['uz'],
      description: ziyoratgoh.description[lang] || ziyoratgoh.description['uz'],
      mainImage: ziyoratgoh.mainImage,
      additionalImages: ziyoratgoh.additionalImages,
    };
  }
}
