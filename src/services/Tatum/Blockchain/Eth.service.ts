import { CreateAxiosDefaults } from "axios";
import { mainConfig } from "../../../config/mainConfig";
import { TatumApiInstance } from "../../../core/TatumApiInstance";
import { ApiError } from "../../../exceptions/ApiError";
import { GetAccountBalanceResponse } from "../../../models/Tatum/Tatum.query.models";
import { WalletModel } from "../../../models/Wallet/Wallet.model";
import { AbstractTatumBlockchainAdapter } from "../../../types/AbstractTatumBlockchainAdapter";
import { NetworksList } from "../../../types/enums/NetworksList";
import { SendTatumTransactionResponse } from "../../../types/SendTatumTransactionResponse";

class Service extends TatumApiInstance implements AbstractTatumBlockchainAdapter {
  private _path = "/v3/ethereum";

  constructor() {
    const testnetHeaders: CreateAxiosDefaults["headers"] = {
      "x-testnet-type": "ethereum-sepolia",
    };
    const config: CreateAxiosDefaults = { headers: testnetHeaders };

    super(mainConfig.isMainnet ? undefined : config);
  }

  public async sendEth(from: string, to: string, amount: string, id: string) {
    const wallet = await WalletModel.findByUserAndAddress(id, from);

    if (!wallet) {
      throw ApiError.BadRequest("Wallet for user not exist");
    }

    if (!amount || isNaN(+amount) || +wallet.nativeBalance < +amount) {
      throw ApiError.BadRequest("Invalid amount");
    }

    if (wallet.network !== NetworksList.ETH) {
      throw ApiError.BadRequest("Invalid wallet type");
    }

    const body = {
      to: to,
      amount: amount,
      currency: NetworksList.ETH,
      signatureId: wallet.signatureId,
      index: wallet.walletIndex
    };

    const path = `${this._path}/transaction`;

    const result: SendTatumTransactionResponse = await this.post(path, body);

    return result;
  }

  async getBalance(address: string) {
    const path = `${this._path}/account/balance/${address}`;

    const result: GetAccountBalanceResponse = await this.get(path);

    return result.balance;
  }
}

export const TatumEthService = new Service();
