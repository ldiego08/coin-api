import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { AssetModule } from './asset';
import { DbModule } from './db';

@Module({
  imports: [DbModule, HttpModule, ScheduleModule.forRoot(), AssetModule],
})
export class AppModule {}
