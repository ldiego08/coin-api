import { DbModule } from 'src/db';

import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { AssetController } from './asset.controller';
import { AssetTasks } from './asset.tasks';

/**
 * Provides access to assets.
 */
@Module({
  imports: [HttpModule, DbModule],
  controllers: [AssetController],
  providers: [AssetTasks],
  exports: [AssetTasks],
})
export class AssetModule {}
