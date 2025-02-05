import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ZiyoratgohlarModule } from './ziyoratgohlar/ziyoratgohlar.module';
import { LoggerMiddleware } from './logger.middleware';
import { AboutUsModule } from './about-us/about-us.module';
import { VisitModule } from './visit/visit.module';
import { LanguageModule } from './languages/languages.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://rustamxonovanargiza:nargizaxon@cluster0.hcpu1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
    ZiyoratgohlarModule,
    AboutUsModule,
    VisitModule,
    LanguageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}