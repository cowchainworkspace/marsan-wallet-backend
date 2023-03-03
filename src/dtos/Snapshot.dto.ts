import { IPriceDb } from "../models/Price/Price.model";
import { ISnapshotDb } from "../models/Snapshot/Snapshot.model";
import { PriceDTO } from "./Price.dto";

export class SnapshotDTO {
  id: string;
  price: PriceDTO | string;
  balance: string;
  createdAt: string;

  constructor(model: ISnapshotDb) {
    this.id = model._id.toString();
    if ((model.price as IPriceDb)._id) {
      this.price = new PriceDTO(model.price as IPriceDb);
    } else {
      this.price = model.price as string;
    }
    this.balance = model.balance;
    this.createdAt = model.createdAt;
  }
}
