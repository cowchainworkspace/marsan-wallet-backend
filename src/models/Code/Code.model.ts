import { model, Schema } from "mongoose";
import { userModelName } from "../User/User.model";

export interface ICode {
  email: string;
  code: string;
  createdAt: number;
}

const codeModelName = "Code";

const Code = new Schema(
  {
    email: { type: String, lowercase: true, required: true },
    code: { type: String, required: true },
    createdAt: { type: Number, default: new Date().valueOf() },
  },
  {
    statics: {
      async findByUserEmail(email: string) {
        return await this.findOne({ email }).lean();
      },
      async deleteById(id: string) {
        return await this.findByIdAndDelete(id).lean();
      },
      async createCode(email: string, code: string) {
        return await this.create({ email: email, code });
      },
    },
  }
);

export const CodeModel = model(codeModelName, Code);
