import { model, Schema, Types } from "mongoose";
import { DAY } from "../../constants";
import { IPrice, PriceModelName } from "../Price/Price.model";
import { IWalletDb, walletModelName } from "../Wallet/Wallet.model";

export const walletField = "wallet";
export const priceField = "price";
export const snapshotModelName = "Snapshot";

export interface ISnapshot {
  wallet: IWalletDb | string;
  price: IPrice | string;
  balance: string;
}

export type ISnapshotDb = ISnapshot & {
  _id: Types.ObjectId;
  createdAt: string;
};

const SchemaInstance = new Schema(
  {
    balance: { type: String, required: true },
    [walletField]: { type: Schema.Types.ObjectId, ref: `${walletModelName}s` },
    [priceField]: { type: Schema.Types.ObjectId, ref: `${PriceModelName}s` },
  },
  {
    timestamps: true,
    statics: {
      async createByWalletAndPrice(payload: ISnapshot) {
        return await this.create(payload);
      },
      async findByWallet(walletId: string) {
        return await this.find<ISnapshotDb>({
          [walletField]: walletId,
          createdAt: {
            $gt: new Date().valueOf() - DAY,
            $lte: new Date(),
          },
        });
      },
    },
  }
);

SchemaInstance.pre("find", function(next) {
  this.populate({
    path: priceField,
    model: PriceModelName,
  });
  next();
});

SchemaInstance.pre("findOne", function(next) {
  this.populate({
    path: priceField,
    model: PriceModelName,
  });
  next();
});

export const SnapshotModel = model(snapshotModelName, SchemaInstance);
