import { AbstractTatumBlockchainAdapter } from "../../../types/AbstractTatumBlockchainAdapter";
import { NetworksList } from "../../../types/enums/NetworksList";
import { TatumEthService } from "./Eth.service";

class Service implements AbstractTatumBlockchainAdapter {
  private _services: Map<
    NetworksList,
    AbstractTatumBlockchainAdapter
  > = new Map();
  constructor() {
    this._services.set(NetworksList.ETH, TatumEthService);
  }
  public async getBalance(arg: { network: NetworksList; args: any }) {
    const service = this._services.get(arg.network);
    if (!service) {
      //after implement all supported networks
      //replace to throw error
      return "0";
    }
    const balance = service.getBalance(arg.args);
    return balance;
  }
}
export const TatumBlockchainAdapterService = new Service();
