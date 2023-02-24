import { PriceDTO } from "../dtos/Price.dto";
import { IPrice, PriceModel } from "../models/Price/Price.model";
import { CurrenciesList } from "../types/enums/currenciesList";

class Service {
  public async createPrice(price: IPrice) {
    const { pair, source, timestamp, price: value, token } = price;
    const dbPrice = await this.getPrice(token, pair);

    if (dbPrice && dbPrice.timestamp >= timestamp) {
      console.log(
        `${dbPrice.token}/${dbPrice.pair} with timestamp=${dbPrice.timestamp} already exists`
      );
      return dbPrice;
    }

    const newDbprice = await PriceModel.createByBody({
      token,
      pair,
      source,
      price: value,
      timestamp,
    });

    console.log(`${newDbprice.token}/${newDbprice.pair} created`);
    const viewPrice = new PriceDTO(newDbprice);

    return viewPrice;
  }

  public async getPrice(token: string, pair: string = CurrenciesList.CAD) {
    const price = await PriceModel.findLastByTokenAndPair(token, pair);

    const viewPrice = new PriceDTO(price);
    return viewPrice;
  }

  public async createPriceBatch(prices: IPrice[]) {
    const newPricesPromise = prices.map(async (price) => {
      const dbPrice = await this.createPrice(price);
      return dbPrice;
    });

    return await Promise.all(newPricesPromise);
  }
}

export const PriceService = new Service();
