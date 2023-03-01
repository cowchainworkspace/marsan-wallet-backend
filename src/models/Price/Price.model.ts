import { model, Schema } from "mongoose";
import { PriceDTO } from "../../dtos/Price.dto";
import { PriceWs } from "../../websockets/Price.ws";

export interface IPrice {
  token: string;
  pair: string;
  source: string;
  price: string;
  timestamp: number;
}

const PriceModelName = "Price";
const SchemaInstance = new Schema(
  {
    token: { type: String, required: true },
    pair: { type: String, required: true },
    source: { type: String, required: true },
    price: { type: String, required: true },
    timestamp: { type: Number, required: true },
  },
  {
    statics: {
      async createByBody(body: IPrice) {
        return await this.create(body);
      },
      async findLastByTokenAndPair(token: string, pair: string) {
        const dbToken = await this.find({ token, pair })
          .sort({ timestamp: -1 })
          .limit(1);

        return dbToken[0] ?? undefined;
      },
    },
  }
);

SchemaInstance.post("save", async (price, next) => {
  const priceView = new PriceDTO(price)
  await PriceWs.handlePriceUpdated(priceView);
  next();
});

export const PriceModel = model(PriceModelName, SchemaInstance);
