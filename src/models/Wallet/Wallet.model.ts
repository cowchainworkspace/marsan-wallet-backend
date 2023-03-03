import { model, Schema, Types } from "mongoose";
import { WalletDTO } from "../../dtos/Wallet.dto";
import { IGeneratedManagedWallet } from "../../types/KmsWalletTypes";
import { userModelName } from "../User/User.model";

export const userField = "user";
export const walletModelName = "Wallet";

export type IWalletDb = IGeneratedManagedWallet & {
  _id: Types.ObjectId;
  network: string;
  address: string;
  nativeBalance?: string;
  isMainnet: boolean;
  walletIndex: number;
  user?: Types.ObjectId;
};

const SchemaInstance = new Schema(
  {
    signatureId: { type: String, required: true },
    xpub: { type: String, required: true },
    network: { type: String, required: true },
    address: { type: String, required: true },
    nativeBalance: { type: String, default: "0" },
    isMainnet: { type: Boolean, required: true },
    walletIndex: { type: Number, required: true },
    [userField]: { type: Schema.Types.ObjectId, ref: `${userModelName}s` },
  },
  {
    statics: {
      async createWalletForUser(payload: Omit<IWalletDb, "_id">) {
        const {
          signatureId,
          xpub,
          network,
          address,
          isMainnet,
          walletIndex,
          user,
        } = payload;
        return await this.create({
          signatureId,
          xpub,
          network,
          address,
          isMainnet,
          walletIndex,
          user,
        });
      },
      async findBySignature(signatureId: string) {
        return await this.findOne({ signatureId });
      },
      async findByAddress(address: string) {
        return await this.findOne({ address });
      },
      async findByUser(userId: string) {
        return await this.find({ user: userId });
      },
      async findByUserAndAddress(userId: string, address: string) {
        return await this.findOne({
          user: userId,
          address: address.toLowerCase(),
        });
      },
      async findAllByNetwork(network: string) {
        const wallets = await this.find({ network: network.toUpperCase() });
        const viewWallets = wallets.map((wallet) => new WalletDTO(wallet));
        return viewWallets;
      },
      async updateBalanceByAddress(address: string, balance: string) {
        return await this.findOneAndUpdate(
          { address },
          { nativeBalance: balance },
          { new: true }
        );
      },
    },
  }
);

SchemaInstance.pre("find", function(next) {
  this.populate({ path: userField, model: userModelName });
  next();
});

SchemaInstance.pre("findOne", function(next) {
  this.populate({ path: userField, model: userModelName });
  next();
});

export const WalletModel = model(walletModelName, SchemaInstance);
