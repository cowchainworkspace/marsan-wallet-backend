import { mainConfig } from "../config/mainConfig";
import { IPriceFetchConfig } from "../config/priceFetchConfig";
import { GetPriceResponse } from "../models/Tatum/Tatum.query.models";
import { PriceService } from "../services/Price.service";
import { TatumUtilsService } from "../services/Tatum/Utils.service";
import { AbstractWorker } from "../types/AbstractWorker";
import { CurrenciesList } from "../types/enums/currenciesList";
import { serializeApiPriceToDbPrice } from "../utils/serializeApiPriceToDbPrice";

class Worker implements AbstractWorker {
  private _tatumUtil: typeof TatumUtilsService;
  private _priceService: typeof PriceService;
  private _tokens: CurrenciesList[];
  private _pairs: CurrenciesList[];

  private _config: IPriceFetchConfig = mainConfig.priceFetch;

  constructor() {
    this._tatumUtil = TatumUtilsService;
    this._priceService = PriceService;
    this._tokens = this._config.tokens;
    this._pairs = this._config.pairs;
  }

  async start() {
    try {
      const pricesArr = await this._fetcher();
      await this._creator(pricesArr);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => this.start(), this._config.delay);
    }
  }

  private async _fetcher() {
    const pricesPerTokenPromise = this._tokens.map(async (token) => {
      const pricesPromise = this._pairs.map(async (pair) => {
        const price = await this._tatumUtil.getPrice(token, pair);
        return price;
      });
      const prices = await Promise.all(pricesPromise);
      return prices;
    });

    return await Promise.all(pricesPerTokenPromise);
  }

  private async _creator(pricesArr: GetPriceResponse[][]) {
    const savedPromise = pricesArr.map(async (prices) => {
      const serializedPrices = prices.map(serializeApiPriceToDbPrice);
      const result = this._priceService.createPriceBatch(serializedPrices);
      return result;
    });
    const saved = await Promise.all(savedPromise);
    return saved;
  }
}

export const PriceWorker = new Worker()