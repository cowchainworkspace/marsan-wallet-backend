import { TatumApiInstance } from "../../core/TatumApiInstance";
import { GetPriceResponse } from "../../models/Tatum/Tatum.query.models";
import { CurrenciesList } from "../../types/enums/currenciesList";

class Service extends TatumApiInstance {
  constructor() {
    super();
  }

  public async getPrice(
    baseCurrency: string,
    basePair: CurrenciesList = CurrenciesList.CAD
  ) {
    const path = `/v3/tatum/rate/${baseCurrency}?basePair=${basePair}`;
    const result: GetPriceResponse = await this.get(path);
    return result;
  }
}

export const TatumUtilsService = new Service();
