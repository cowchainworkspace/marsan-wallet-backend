import { IDbUser, UserModel } from "../models/User/User.model";
import { ApiError } from "../exceptions/ApiError";
import { UserDTO } from "../dtos/User.dto";
import {
  compareStringWithHash,
  generateHashFromString,
} from "../utils/hashUtil";
import { VerifyEmailModel } from "../models/VerifyEmail/VerifyEmail.model";
import { TokenService } from "./Token.service";
import { UserResponseBody } from "../models/User/User.query.models";
import { WalletService } from "./Wallet.service";
import { WalletModel } from "../models/Wallet/Wallet.model";
import { WalletDTO } from "../dtos/Wallet.dto";

class Service {
  public async register(email: string, password: string) {
    const isExists = await UserModel.findByEmail(email);

    if (isExists) {
      throw ApiError.BadRequest("User with this email is already exists");
    }

    const verifiedEmail = await VerifyEmailModel.findByEmail(email);

    if (!verifiedEmail) {
      throw ApiError.BadRequest("Email is not verified");
    }

    const hashPassword = await generateHashFromString(password);
    const user = await UserModel.createByEmailAndPassword(email, hashPassword);

    user.verifiedEmail = verifiedEmail._id;
    const changedUser = await user.save();

    verifiedEmail.user = changedUser._id;
    await verifiedEmail.save();

    await WalletService.createEthWalletForUser(changedUser._id.toString());

    return await this._generateReturn(changedUser);
  }

  public async login(email: string, password: string) {
    const user = await UserModel.findByEmail(email);

    if (!user) {
      throw ApiError.BadRequest("Invalid email or password");
    }

    const result = await compareStringWithHash(password, user.password);

    if (!result) {
      throw ApiError.BadRequest("Invalid email or password");
    }

    return await this._generateReturn(user);
  }

  public async logout(refreshToken: string) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }

  public async refresh(userId: string) {
    const user = await UserModel.findById(userId);

    if (!user) {
      throw ApiError.UnauthorizedError();
    }

    return await this._generateReturn(user);
  }

  public async changePasswordById(id: string, password: string) {
    const user = await UserModel.findById(id);

    if (!user) {
      throw ApiError.BadRequest("Invalid user id");
    }

    const compareresult = await compareStringWithHash(password, user.password);

    if (compareresult) {
      throw ApiError.BadRequest(
        "The new password must be different from the old password"
      );
    }

    const hashPassword = await generateHashFromString(password);
    user.password = hashPassword;

    const updatedUser = await user.save();

    return await this._generateReturn(updatedUser);
  }

  public async getAllUsers(skip: number = 0, limit: number = 10) {
    const users = await UserModel.findUsers(skip, limit);

    const viewUsers = users.map((user) => {
      return new UserDTO(user);
    });

    return viewUsers;
  }

  private async _generateReturn(user: IDbUser): Promise<UserResponseBody> {
    const viewUser = new UserDTO(user);
    const tokens = TokenService.generateTokens(viewUser);

    const wallets = await WalletModel.findByUser(user._id.toString());
    const viewWallets = wallets.map((wallet) => new WalletDTO(wallet));

    await TokenService.saveToken(viewUser.id, tokens.refreshToken);

    return { ...tokens, user: viewUser, wallets: viewWallets };
  }
}

export const UserService = new Service();
