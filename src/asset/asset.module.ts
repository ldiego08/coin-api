import { DbModule } from 'src/db';

import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';

import { AssetController } from './asset.controller';
import { AssetTasks } from './asset.tasks';

/**
 * Provides access to assets.
 */
@Module({
  imports: [CacheModule.register(), HttpModule, DbModule],
  controllers: [AssetController],
  providers: [AssetTasks],
  exports: [AssetTasks],
})
export class AssetModule {}
