import { DbModule } from 'src/db';

import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { AssetTasks } from './asset.tasks';

@Module({
  imports: [HttpModule, DbModule],
  providers: [AssetTasks],
  exports: [AssetTasks],
})
export class AssetModule {}
