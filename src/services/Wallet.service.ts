import { UserModel } from "../models/User/User.model";
import { ApiError } from "../exceptions/ApiError";
import { KeyManagementService } from "./KeyManagement.service";
import { NetworksList } from "../types/enums/NetworksList";
import { WalletModel } from "../models/Wallet/Wallet.model";
import { WalletDTO } from "../dtos/Wallet.dto";
import { zeroBalance } from "../constants";

class Service {
  public async createEthWalletForUser(userId: string) {
    return await this.createWallet(NetworksList.ETH, userId);
  }

  public async createBtcWalletForUser(userId: string) {
    return await this.createWallet(NetworksList.BTC, userId);
  }

  public async getPrivateKeyForSignature(signatureId: string) {
    return KeyManagementService.getPrivateKey(signatureId);
  }

  public async createWallet(network: NetworksList, userId: string) {
    const user = await UserModel.findById(userId);

    if (!user) {
      throw ApiError.BadRequest("Invalid user id");
    }

    const {
      signatureId,
      xpub,
      isMainnet,
    } = await KeyManagementService.generateManagedWallet(network);

    const { address, derivationIdx } = await KeyManagementService.getAddress(
      signatureId
    );

    const wallet = await WalletModel.createWalletForUser({
      signatureId,
      xpub,
      address,
      walletIndex: derivationIdx,
      isMainnet,
      network: network,
      user: user._id,
    });

    const viewWallet = new WalletDTO(wallet);

    return viewWallet;
  }
}

export const WalletService = new Service();
