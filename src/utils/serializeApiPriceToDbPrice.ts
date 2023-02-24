import { IPrice } from "../models/Price/Price.model";
import { GetPriceResponse } from "../models/Tatum/Tatum.query.models";

export const serializeApiPriceToDbPrice = (apiPrice: GetPriceResponse) => {
  const { basePair: pair, source, timestamp, value, id: token } = apiPrice;
  const price: IPrice = {
    pair,
    source,
    timestamp,
    price: value,
    token,
  };
  return price;
};
