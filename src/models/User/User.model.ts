import { model, Schema, Types } from "mongoose";
import { verifiedEmailModelName } from "../VerifyEmail/VerifyEmail.model";

export interface IUser {
  email: string;
  password: string;
  verifiedEmail?: Types.ObjectId;
  isUserVerified: boolean;
  isTwoFactored: boolean;
}

export interface IDbUser extends IUser {
  _id: Types.ObjectId;
}

export const userModelName = "User";
export const verifiedEmailField = "verifiedEmail";
const User = new Schema(
  {
    email: { type: String, lowercase: true, required: true },
    password: { type: String, required: true },
    [verifiedEmailField]: {
      type: Schema.Types.ObjectId,
      ref: verifiedEmailModelName,
    },
    isUserVerified: { type: Boolean, default: false },
    isTwoFactored: { type: Boolean, default: false },
  },
  {
    statics: {
      async createByEmailAndPassword(email: string, password: string) {
        return await this.create({ email: email.toLowerCase(), password });
      },
      async findByEmail(email: string) {
        return await this.findOne({ email: email.toLowerCase() }).lean();
      },
      async changePasswordById(id: string, password) {
        return await this.findByIdAndUpdate(
          id,
          { password: password },
          { new: true }
        ).lean();
      },
      async findUsers(skip: number, limit: number) {
        return await this.find()
          .skip(skip)
          .limit(limit)
          .lean();
      },
    },
  }
);

export const UserModel = model(userModelName, User);
