import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * Provides database access.
 */
@Injectable()
export class DbClient extends PrismaClient implements OnModuleInit {
  /** @inheritdoc */
  public async onModuleInit(): Promise<void> {
    await this.$connect();
  }
}
