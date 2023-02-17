import { model, Schema } from "mongoose";
import { UserDTO } from "../../dtos/User.dto";
import { userModelName } from "../User/User.model";

export interface IVerifyEmail {
  refreshToken: string;
  user?: UserDTO;
}

export const tokenModelName = "Token";
export const userField = "user";

const SchemaInstance = new Schema(
  {
    refreshToken: { type: String, required: true },
    [userField]: {
      type: Schema.Types.ObjectId,
      ref: `${userModelName}s`,
      required: true,
    },
  },
  {
    statics: {
      async createByUser(id: string, token: string) {
        return await this.create({ [userField]: id, refreshToken: token });
      },
      async findByUser(id: string) {
        return await this.findOne({ [userField]: id });
      },
      async findByToken(token: string) {
        return await this.findOne({ refreshToken: token });
      },
      async deleteByToken(token: string) {
        return await this.deleteOne({ refreshToken: token });
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

export const TokenModel = model(tokenModelName, SchemaInstance);
