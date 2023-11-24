import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssetModule } from './asset';
import { DbModule } from './db';

@Module({
  imports: [DbModule, HttpModule, ScheduleModule.forRoot(), AssetModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
