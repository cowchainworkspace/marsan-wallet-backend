import { Types } from "mongoose";
import { IVerifyEmail } from "../models/VerifyEmail/VerifyEmail.model";

type VerifiedDTO = Omit<IVerifyEmail, "user">;

export class VerifyEmailDTO implements VerifiedDTO {
  id: string;
  email: string;

  constructor(model: VerifiedDTO & { _id: Types.ObjectId }) {
    this.id = model._id.toString();
    this.email = model.email;
  }
}
