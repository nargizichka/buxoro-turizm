import { Controller, Get, Post, Ip } from '@nestjs/common';
import { VisitService } from './visit.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('visits')
export class VisitController {
  constructor(private readonly visitService: VisitService) {}

  @Post()
  @ApiOperation({ summary: 'Tashrifni qo‘shish' })
  @ApiResponse({ status: 200, description: 'Tashrif muvaffaqiyatli qo‘shildi.' })
  async recordVisit(@Ip() ip: string) {
    return this.visitService.recordVisit(ip);
  }

  @Get()
  @ApiOperation({ summary: 'Ziyoratgohlar ro‘yxatini olish' })
  @ApiResponse({ status: 200, description: 'Ziyoratgohlar ro‘yxati muvaffaqiyatli olishi mumkin.' })
  async getVisits() {
    return this.visitService.getVisits();
  }
}
