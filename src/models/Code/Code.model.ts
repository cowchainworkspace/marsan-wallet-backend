import { model, Schema } from "mongoose";

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
    createdAt: { type: Number, required: true },
  },
  {
    statics: {
      async findByUserEmail(email: string) {
        return await this.findOne({ email: email.toLowerCase() }).lean();
      },
      async deleteById(id: string) {
        return await this.findByIdAndDelete(id).lean();
      },
      async createCode(email: string, code: string) {
        const timestamp = new Date().valueOf();
        return await this.create({
          email: email.toLowerCase(),
          code,
          createdAt: timestamp,
        });
      },
    },
  }
);

export const CodeModel = model(codeModelName, Code);
