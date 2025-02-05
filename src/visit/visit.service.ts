import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Visit } from './entities/visit.entity';
import axios from 'axios';

@Injectable()
export class VisitService {
  constructor(@InjectModel(Visit.name) private readonly model: Model<Visit>) {}

  async recordVisit(ip: string): Promise<Visit> {
    let country = 'Unknown';

    // IP orqali mamlakatni aniqlash
    try {
      const response = await axios.get(`https://ipapi.co/${ip}/json/`);
      country = response.data.country_name || 'Unknown';
    } catch (error) {
      console.error('IP ma’lumotlarini olishda xatolik:', error.message);
    }

    // Bazada mavjud bo'lgan hujjatni olish yoki yangi yaratish
    let visitRecord = await this.model.findOne();
    if (!visitRecord) {
      visitRecord = new this.model({
        nationalVisits: 1,
        internationalVisits: 1,
      });
    }

    // O'zbekistonlik yoki chet ellik foydalanuvchini aniqlash
    if (country === 'Uzbekistan') {
      visitRecord.nationalVisits += 1;
    } else {
      visitRecord.internationalVisits += 1;
    }

    await visitRecord.save();
    return visitRecord;
  }

  async getVisits(): Promise<Visit> {
    let visitRecord = await this.model.findOne();

    if (!visitRecord) {
      return { nationalVisits: 1, internationalVisits: 1 } as Visit;
    }

    return visitRecord;
  }
}
