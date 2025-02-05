import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AboutUs } from './entities/about-us.entity';
import { CreateAboutUsDto } from './dto/create-about-us.dto';

@Injectable()
export class AboutUsService {
  constructor(@InjectModel(AboutUs.name) private aboutUsModel: Model<AboutUs>) {}

  // ✅ CREATE (Yaratish)
  async create(createAboutUsDto: CreateAboutUsDto) {
    if (!createAboutUsDto.aboutImg) {
      throw new BadRequestException('aboutImg fayli majburiy.');
    }

    const aboutUs = new this.aboutUsModel(createAboutUsDto);
    return aboutUs.save();
  }

  // ✅ GET (Olish)
  async findAll() {
    const aboutUs = await this.aboutUsModel.find();
    if (!aboutUs.length) throw new NotFoundException('About Us ma’lumotlari topilmadi.');
    return aboutUs;
  }

  // ✅ UPDATE (Yangilash)
  async update(id: string, updateData: Partial<CreateAboutUsDto>) {
    const aboutUs = await this.aboutUsModel.findById(id);
    if (!aboutUs) throw new NotFoundException('About Us ma’lumotlari topilmadi.');

    return this.aboutUsModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  // ✅ DELETE (O‘chirish)
  async remove(id: string) {
    const aboutUs = await this.aboutUsModel.findById(id);
    if (!aboutUs) throw new NotFoundException('About Us ma’lumotlari topilmadi.');
    
    return this.aboutUsModel.findByIdAndDelete(id);
  }
}
