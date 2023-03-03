import { MINUTE } from "../constants";
import { CurrenciesList } from "../types/enums/currenciesList";

export interface IPriceFetchConfig {
  delay: number;
  tokens: CurrenciesList[];
  pairs: CurrenciesList[];
}

const configSelector = () => {
  const config: IPriceFetchConfig = {
    delay: MINUTE,
    tokens: [CurrenciesList.ETH, CurrenciesList.BTC],
    pairs: [CurrenciesList.CAD, CurrenciesList.USD],
  };

  return config;
};

export const priceFetchConfig: IPriceFetchConfig = configSelector();
