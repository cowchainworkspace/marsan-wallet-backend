import { Model, model, Schema, Types } from "mongoose";

export interface IUser {
  email: string;
  password: string;
  isEmailVerified: boolean;
  isUserVerified: boolean;
  isTwoFactored: boolean;
}

export const userModelName = "User";

const User = new Schema(
  {
    email: { type: String, lowercase: true, required: true },
    password: { type: String, required: true },
    isEmailVerified: { type: Boolean, default: false },
    isUserVerified: { type: Boolean, default: false },
    isTwoFactored: { type: Boolean, default: false },
  },
  {
    statics: {
      async createByEmailAndPassword(email: string, password: string) {
        return await this.create({ email, password, isEmailVerified: true });
      },
      async findByEmail(email: string) {
        return await this.findOne({ email: email }).lean();
      },
      async changePasswordById(id: string, password) {
        return await this.findByIdAndUpdate(
          id,
          { password: password },
          { new: true }
        ).lean();
      },
      async findUsers(skip: number, limit: number) {
        return await this.find().skip(skip).limit(limit).lean();
      },
    },
  }
);

export const UserModel = model(userModelName, User);
