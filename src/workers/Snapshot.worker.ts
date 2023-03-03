import { CronJob } from "cron";
import { mainConfig } from "../config/mainConfig";
import { IPriceFetchConfig } from "../config/priceFetchConfig";
import { everyDay } from "../constants/cronIntervals";
import { PriceDTO } from "../dtos/Price.dto";
import { WalletDTO } from "../dtos/Wallet.dto";
import { SnapshotModel } from "../models/Snapshot/Snapshot.model";
import { WalletModel } from "../models/Wallet/Wallet.model";
import { PriceService } from "../services/Price.service";
import { AbstractWorker } from "../types/AbstractWorker";
import { CurrenciesList } from "../types/enums/currenciesList";

type PricesForToken = Record<string, PriceDTO[]>;

class Worker implements AbstractWorker {
  private _tokens: CurrenciesList[];
  private _pairs: CurrenciesList[];

  constructor(
    private readonly _schedule: string,
    private _config: IPriceFetchConfig,
    private readonly _priceService: typeof PriceService
  ) {
    this._tokens = this._config.tokens;
    this._pairs = this._config.pairs;
  }

  async start() {
    try {
      const result = new CronJob(this._schedule, () => this._scheduleHandler());
      result.start();
    } catch (error) {
      console.error(error);
    }
  }

  private async _scheduleHandler() {
    try {
      console.log("[Snapshot worker]: started");
      const prices = await this._getPriceForTokens(this._tokens, this._pairs);
      await this._createSnapshots(prices);
    } catch (error) {
      console.log("[Snapshot worker]: error");
      console.error(error);
    } finally {
      console.log("[Snapshot worker]: end of work");
    }
  }

  private async _getPriceForTokens(
    tokens: CurrenciesList[],
    pairs: CurrenciesList[]
  ) {
    const result = await tokens.reduce(async (prev, curToken) => {
      const prices = await this._fetchPairPricesForToken(curToken, pairs);
      const res = await prev;
      res[curToken] = prices;
      return res;
    }, Promise.resolve<PricesForToken>({}));

    return result;
  }

  private async _fetchPairPricesForToken(
    token: string,
    pairs: CurrenciesList[]
  ) {
    const prices = pairs.map(async (pair) => {
      const price = await this._priceService.getPrice(token, pair);
      return price;
    });

    return await Promise.all(prices);
  }

  private async _createSnapshots(prices: PricesForToken) {
    const tokensArr = Object.keys(prices);

    const resultPromise = tokensArr.map(async (token) => {
      const tokenPrices = prices[token];
      const wallets = await WalletModel.findAllByNetwork(token);

      return await this._createSnapshotsForWallets(wallets, tokenPrices);
    });

    const result = await Promise.all(resultPromise);
    return result;
  }

  private async _createSnapshotsForWallets(
    wallets: WalletDTO[],
    prices: PriceDTO[]
  ) {
    const withPrices = wallets.map(async (wallet) => {
      return await this._createSnapshotForPricesWithWallet(wallet, prices);
    });
    return await Promise.all(withPrices);
  }

  private async _createSnapshotForPricesWithWallet(
    wallet: WalletDTO,
    prices: PriceDTO[]
  ) {
    const result = prices.map(async (price) => {
      return await this._snapshotCreator(wallet, price);
    });

    return await Promise.all(result);
  }

  private async _snapshotCreator(wallet: WalletDTO, price: PriceDTO) {
    return await SnapshotModel.createByWalletAndPrice({
      balance: wallet.nativeBalance,
      wallet: wallet.id,
      price: price.id,
    });
  }
}

export const SnapshotWorker = new Worker(
  everyDay,
  mainConfig.priceFetch,
  PriceService
);
