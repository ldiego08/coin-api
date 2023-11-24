import { Module } from '@nestjs/common';

import { DbClient } from './DbClient';

/**
 * Module providing database access.
 */
@Module({
  providers: [DbClient],
  exports: [DbClient],
})
export class DbModule {}
