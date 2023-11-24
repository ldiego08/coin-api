import { firstValueFrom } from 'rxjs';
import { z } from 'zod';

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';

import { DbClient } from '../db';

import { ASSET_SYNC_FREQUENCY, SUPPORTED_ASSETS } from './consts';

const CoingeckoCoinMarketsResponse = z
  .object({
    id: z.string(),
    symbol: z.string(),
    current_price: z.number(),
    market_cap: z.number(),
  })
  .transform((raw) => ({
    id: raw.id,
    symbol: raw.symbol,
    priceUsd: raw.current_price,
    marketCapUsd: raw.market_cap,
  }))
  .array();

/**
 * Defines tasks on assets like syncing market data.
 */
@Injectable()
export class AssetTasks {
  private isSyncingAssets = false;

  constructor(
    private readonly http: HttpService,
    private readonly db: DbClient,
  ) {}

  /**
   * Syncs assets by querying market data a remote API (Coingecko) and
   * updating the database.
   *
   * **NOTE:** This is a scheduled task running with the frequency defined
   * by `ASSET_SYNC_FREQUENCY`.
   */
  @Interval(ASSET_SYNC_FREQUENCY)
  public async syncAssets() {
    if (this.isSyncingAssets) {
      return;
    }

    this.isSyncingAssets = true;

    const date = this.getCurrentUtcDate();
    const assets = await this.getAssetsFromApi();

    const assetUpdates = assets.map(({ id, symbol, priceUsd, marketCapUsd }) =>
      this.db.assetMarket.upsert({
        where: {
          id_date: {
            id,
            date,
          },
        },
        update: {
          priceUsd,
          marketCapUsd,
        },
        create: {
          id,
          date,
          symbol,
          priceUsd,
          marketCapUsd,
        },
      }),
    );

    this.db.$transaction(assetUpdates);

    this.isSyncingAssets = false;
  }

  /**
   * Fetch asset market data from a remote API endpoint (Coingecko).
   */
  private async getAssetsFromApi() {
    const url = new URL('api/v3/coins/markets', 'https://api.coingecko.com/');

    url.searchParams.append('vs_currency', 'usd');
    url.searchParams.append('ids', SUPPORTED_ASSETS.join(','));

    const response = await firstValueFrom(this.http.get(url.toString()));
    const coins = CoingeckoCoinMarketsResponse.parse(response.data);

    return coins;
  }

  private getCurrentUtcDate() {
    const now = new Date();

    return new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
    );
  }
}
