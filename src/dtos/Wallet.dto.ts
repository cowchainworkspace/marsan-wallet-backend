import { Types } from "mongoose";
import { IWalletDb } from "../models/Wallet/Wallet.model";
import { NetworksList } from "../types/enums/NetworksList";

type Wallet = Omit<IWalletDb, "user">;

export class WalletDTO implements Omit<Wallet, "_id"> {
  id: string;
  signatureId: string;
  xpub: string;
  network: string;
  address: string;

  constructor(model: IWalletDb & { _id: Types.ObjectId }) {
    this.id = model._id.toString();
    this.signatureId = model.signatureId;
    this.xpub = model.xpub;
    this.network = model.network;
    this.address = model.address;
  }
}
