import { IWalletDb } from "../models/Wallet/Wallet.model";

export class WalletDTO {
  id: string;
  signatureId: string;
  network: string;
  address: string;
  nativeBalance: string
  isMainnet: boolean;
  index: number;

  constructor(model: IWalletDb) {
    this.id = model._id.toString();
    this.signatureId = model.signatureId;
    this.network = model.network;
    this.address = model.address;
    this.isMainnet = model.isMainnet;
    this.index = model.walletIndex;
    this.nativeBalance = model?.nativeBalance ?? '0'
  }
}
