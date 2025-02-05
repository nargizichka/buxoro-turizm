import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ZiyoratgohlarService } from './ziyoratgohlar.service';
import { ZiyoratgohlarController } from './ziyoratgohlar.controller';
import { Ziyoratgoh, ZiyoratgohSchema } from './entities/ziyoratgohlar.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Ziyoratgoh.name, schema: ZiyoratgohSchema }])],
  controllers: [ZiyoratgohlarController],
  providers: [ZiyoratgohlarService],
})
export class ZiyoratgohlarModule {}
