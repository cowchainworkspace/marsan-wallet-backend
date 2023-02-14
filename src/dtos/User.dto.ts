import { Types } from "mongoose";
import { IUser } from "../models/User/User.model";

export class UserDTO implements Omit<IUser, "password"> {
  id: string;
  email: string;
  isEmailVerified: boolean;
  isUserVerified: boolean;
  isTwoFactored: boolean;

  constructor(model: IUser & { _id: Types.ObjectId }) {
    this.id = model._id.toString();
    this.email = model.email;
    this.isEmailVerified = model.isEmailVerified;
    this.isUserVerified = model.isUserVerified;
    this.isTwoFactored = model.isTwoFactored;
  }
}
