import { Types } from "mongoose";
import { ICode } from "../models/Code/Code.model";

export class CodeDTO implements Omit<ICode, "user"> {
  id: string;
  email: string;
  code: string;
  createdAt: number;

  constructor(model: ICode & { _id: Types.ObjectId }) {
    this.id = model._id.toString();
    this.code = model.code;
    this.createdAt = model.createdAt;
    this.email = model.email;
  }
}
