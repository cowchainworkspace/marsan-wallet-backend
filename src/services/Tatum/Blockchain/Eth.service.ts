import { CreateAxiosDefaults } from "axios";
import { mainConfig } from "../../../config/mainConfig";
import { TatumApiInstance } from "../../../core/TatumApiInstance";
import { GetAccountBalanceResponse } from "../../../models/Tatum/Tatum.query.models";
import { WalletModel } from "../../../models/Wallet/Wallet.model";
import { NetworksList } from "../../../types/enums/NetworksList";
import { SendTatumTransactionResponse } from "../../../types/SendTatumTransactionResponse";

class Service extends TatumApiInstance {
  private _path = "/v3/ethereum";

  constructor() {
    const testnetHeaders: CreateAxiosDefaults["headers"] = {
      "x-testnet-type": "ethereum-sepolia",
    };
    const config: CreateAxiosDefaults = { headers: testnetHeaders };

    super(mainConfig.isMainnet ? undefined : config);
  }

  public async sendEth(to: string, amount: string, signatureId: string) {
    const wallet = await WalletModel.findBySignature(signatureId);

    if (!wallet) {
      throw new Error("Invalid signatureId");
    }

    const body = {
      to: to,
      amount: amount,
      currency: NetworksList.ETH,
      signatureId: signatureId,
    };

    const path = `${this._path}/transaction`;

    const result: SendTatumTransactionResponse = await this.post(path, body);

    return result;
  }

  public async getBalance(address: string) {
    const path = `${this._path}/account/balance/${address}`;

    const result: GetAccountBalanceResponse = await this.get(path);

    return result;
  }
}

export const TatumEthService = new Service();
