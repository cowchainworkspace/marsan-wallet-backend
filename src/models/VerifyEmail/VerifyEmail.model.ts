import { model, Schema } from "mongoose";
import { UserDTO } from "../../dtos/User.dto";
import { userModelName } from "../User/User.model";

export interface IVerifyEmail {
  email: string;
  user?: UserDTO;
}

export const verifiedEmailModelName = "VerifyEmail";
export const userField = "user";

const SchemaInstance = new Schema(
  {
    email: { type: String, lowercase: true, required: true },
    [userField]: { type: Schema.Types.ObjectId, ref: `${userModelName}s` },
  },
  {
    statics: {
      async createByEmail(email: string) {
        return await this.create({ email: email.toLowerCase() });
      },
      async findByEmail(email: string) {
        return await this.findOne({ email: email.toLowerCase() });
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

export const VerifyEmailModel = model(verifiedEmailModelName, SchemaInstance);
