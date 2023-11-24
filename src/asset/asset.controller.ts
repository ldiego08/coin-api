import { IsDateString, IsNumber, IsOptional } from 'class-validator';
import { getCurrentUtcDate, getUtcDate } from 'src/utils';

import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';

import { DbClient } from '../db';

import { SUPPORTED_ASSETS } from './consts';

export class AssetGetQuery {
  @IsDateString()
  @IsOptional()
  public from: string | undefined;

  @IsDateString()
  @IsOptional()
  public to: string | undefined;

  @IsNumber()
  @IsOptional()
  public limit: number;

  @IsNumber()
  @IsOptional()
  public offset: number;
}

/**
 * Provides endpoints to query assets.
 */
@Controller('asset/:id')
export class AssetController {
  constructor(private readonly db: DbClient) {}

  /**
   * Gets an asset's historical market data.
   *
   * @param id The asset ID.
   */
  @Get()
  public async get(
    @Param('id') id: string,
    @Query() { limit = 15, offset = 0, ...params }: AssetGetQuery,
  ) {
    if (!SUPPORTED_ASSETS.includes(id)) {
      throw new BadRequestException(
        `Asset ${id} is not supported. ` +
          `Available assets are: ${SUPPORTED_ASSETS.join(', ')}`,
      );
    }

    const from = params.from
      ? getUtcDate(new Date(params.from))
      : getCurrentUtcDate();

    const to = params.from ? getUtcDate(new Date(params.from)) : undefined;

    const asset = await this.db.assetMarket.findMany({
      where: {
        id,
        date: {
          gte: from,
          lte: to,
        },
      },
      orderBy: {
        date: 'asc',
      },
      take: limit,
      skip: offset,
    });

    return asset;
  }
}
