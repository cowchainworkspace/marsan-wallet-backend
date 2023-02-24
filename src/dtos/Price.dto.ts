import { Types } from "mongoose";
import { IPrice } from "../models/Price/Price.model";

export class PriceDTO {
  id: string;
  token: string;
  pair: string;
  source: string;
  price: string;
  timestamp: number;

  constructor(model: IPrice & { _id: Types.ObjectId }) {
    this.id = model._id.toString();
    this.token = model.token;
    this.pair = model.pair;
    this.source = model.source;
    this.price = model.price;
    this.timestamp = model.timestamp;
  }
}
