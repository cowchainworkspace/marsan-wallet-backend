import { model, Schema, Types } from "mongoose";
import { NetworksList } from "../../types/enums/NetworksList";
import { IGeneratedManagedWallet } from "../../types/KmsWalletTypes";
import { IDbUser, userModelName } from "../User/User.model";

export const userField = "user";
export const walletModelName = "Wallet";

export type IWalletDb = IGeneratedManagedWallet & {
  network: string;
  address: string;
  _id: Types.ObjectId;
  user?: Types.ObjectId;
};

const SchemaInstance = new Schema(
  {
    signatureId: { type: String, required: true },
    address: { type: String, required: true },
    xpub: { type: String, required: true },
    network: { type: String, required: true },
    [userField]: { type: Schema.Types.ObjectId, ref: `${userModelName}s` },
  },
  {
    statics: {
      async createWalletForUser(
        payload: IGeneratedManagedWallet & {
          address: string;
          network: NetworksList;
          user: Types.ObjectId;
        }
      ) {
        const { signatureId, xpub, network, user, address } = payload;
        return await this.create({
          signatureId,
          xpub,
          network,
          address,
          [userField]: user,
        });
      },
      async findBySignature(signatureId: string) {
        return await this.findOne({ signatureId });
      },
      async findByUser(userId: string) {
        return await this.find({ user: userId });
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
