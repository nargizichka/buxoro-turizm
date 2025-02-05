import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Visit, VisitSchema } from './entities/visit.entity';
import { VisitService } from './visit.service';
import { VisitController } from './visit.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Visit.name, schema: VisitSchema }])],
  controllers: [VisitController],
  providers: [VisitService]
})
export class VisitModule {}
