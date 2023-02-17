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
import { KeyManagementService } from "./KeyManagement.service";
import { NetworksList } from "../types/enums/NetworksList";
import { WalletModel } from "../models/Wallet/Wallet.model";
import { WalletDTO } from "../dtos/Wallet.dto";

class Service {
  public async createEthWalletForUser(userId: string) {
    return await this.createWallet(NetworksList.ETH, userId);
  }

  public async createWallet(network: NetworksList, userId: string) {
    const user = await UserModel.findById(userId);

    if (!user) {
      throw ApiError.BadRequest("Invalid user id");
    }

    const {
      signatureId,
      xpub,
    } = await KeyManagementService.generateManagedWallet(network);

    const { address } = await KeyManagementService.getAddress(signatureId);

    const wallet = await WalletModel.createWalletForUser({
      signatureId,
      xpub,
      address,
      network: network,
      user: user._id,
    });

    const viewWallet = new WalletDTO(wallet);

    return viewWallet;
  }
}

export const WalletService = new Service();
