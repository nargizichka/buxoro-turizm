import { 
  Controller, 
  Get, 
  Post, 
  Patch, 
  Delete, 
  UseInterceptors, 
  UploadedFile, 
  Body, 
  Param 
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AboutUsService } from './about-us.service';
import { CreateAboutUsDto } from './dto/create-about-us.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AboutUs } from './entities/about-us.entity';

@ApiTags('AboutUs')
@Controller('about-us')
export class AboutUsController {
  constructor(private readonly aboutUsService: AboutUsService) {}

  // ✅ CREATE (POST)
  @Post()
  @ApiResponse({ status: 200, description: 'Muvaffaqiyatli yaratildi', type: AboutUs })
  @UseInterceptors(
    FileInterceptor('aboutImg', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
        },
      }),
    })
  )
  @ApiOperation({ summary: 'About Us ma’lumotlarini yaratish' })
  async create(
    @UploadedFile() aboutImg: Express.Multer.File,
    @Body() body: CreateAboutUsDto
  ) {
    return this.aboutUsService.create({
      ...body,
      aboutImg: aboutImg?.filename, // Fayl yuklanmagan bo‘lsa, null bo‘lsin
    });
  }

  // ✅ GET (GET)
  @Get()
  @ApiOperation({ summary: 'About Us ma’lumotlarini olish' })
  async findAll() {
    return this.aboutUsService.findAll();
  }

  @Get(':id')
async getAboutUsById(@Param('id') id: string) {
    return this.aboutUsService.getById(id);
}


  // ✅ UPDATE (Patch)
  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Muvaffaqiyatli yangilandi', type: AboutUs })
  @UseInterceptors(
    FileInterceptor('aboutImg', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
        },
      }),
    })
  )
  @ApiOperation({ summary: 'About Us ma’lumotlarini yangilash' })
  async update(
    @Param('id') id: string,
    @UploadedFile() aboutImg: Express.Multer.File,
    @Body() body: CreateAboutUsDto
  ) {
    return this.aboutUsService.update(id, {
      ...body,
      ...(aboutImg && { aboutImg: aboutImg.filename }),
    });
  }

  // ✅ DELETE (DELETE)
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Muvaffaqiyatli o‘chirildi', type: AboutUs })
  @ApiOperation({ summary: 'About Us ma’lumotlarini o‘chirish' })
  async remove(@Param('id') id: string) {
    return this.aboutUsService.remove(id);
  }
}
