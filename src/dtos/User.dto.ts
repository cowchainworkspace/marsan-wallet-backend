import { Types } from "mongoose";
import { IDbUser, IUser } from "../models/User/User.model";
export class UserDTO implements Omit<IUser, "password"> {
  id: string;
  email: string;
  isEmailVerified: boolean;
  isUserVerified: boolean;
  isTwoFactored: boolean;

  constructor(model: IDbUser) {
    this.id = model._id.toString();
    this.email = model.email;
    this.isUserVerified = model.isUserVerified;
    this.isTwoFactored = model.isTwoFactored;
    this.isEmailVerified = !!model.verifiedEmail
  }
}
