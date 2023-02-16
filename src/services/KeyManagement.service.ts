import cp from "child_process";
import { mainConfig } from "../config/mainConfig";
import { MINUTE, SECOND } from "../constants";
import { NetworksList } from "../types/enums/NetworksList";
import {
  IAddress,
  IExportedWallets,
  IGeneratedManagedWallet,
  IPrivateKey,
  ManagedWallet,
} from "../types/KmsWalletTypes";

class Service {
  private _processes: Map<
    string,
    { process: cp.ChildProcess; controller: AbortController }
  > = new Map();
  private _config = mainConfig.kmsConfig;
  private _scripts = mainConfig.kmsConfig.scripts;

  public async startListenTransactions(
    chains: NetworksList[],
    period: number = this._config.daemonPeriod,
    showMessages: boolean = true
  ) {
    //Probably check is admin
    //..
    const chainsOption = !!chains.length ? `--chain=${chains.join(",")}` : "";

    const periodOption = `--period=${
      !!period && period < MINUTE / SECOND ? period : this._config.daemonPeriod
    }`;

    const script = `${this._scripts.startDaemon} ${chainsOption} ${periodOption}`;

    const controller = new AbortController();

    const spawnOptions = {
      shell: true,
      signal: controller.signal,
    };

    const spawnProcess = cp.spawn(script, spawnOptions);

    this._addProcessWithName(
      this._scripts.startDaemon,
      spawnProcess,
      controller,
      showMessages
    );
  }

  public async stopListenTransactions() {
    //Probably check is admin
    //..
    this._stopProcessWithName(this._scripts.startDaemon);
  }

  public async generateManagedWallet(chain: NetworksList) {
    const execResult: IGeneratedManagedWallet | null = await this._execRunner(
      `${this._scripts.generateManagedWallet} ${chain}`
    );
    return execResult;
  }

  public async exportAllWallets() {
    //Probably check is admin
    //..
    const execResult: IExportedWallets | null = await this._execRunner(
      this._scripts.exportWallets
    );
    return execResult;
  }

  public async getManagedWallet(signatureId: string) {
    const execResult: ManagedWallet | null = await this._execRunner(
      `${this._scripts.getManagedWallet} ${signatureId}`
    );
    return execResult;
  }

  public async getPrivateKey(signatureId: string) {
    const execResult: IPrivateKey | null = await this._execRunner(
      `${this._scripts.getPrivateKey} ${signatureId}`
    );
    return execResult;
  }

  public async getAddress(signatureId: string) {
    const execResult: IAddress | null = await this._execRunner(
      `${this._scripts.getAddress} ${signatureId}`
    );
    return execResult;
  }

  private _stopProcessWithName(name: string) {
    const pair = this._processes.get(name);
    if (pair) {
      this._processes.delete(name);
      pair.controller.abort();
    }
  }

  private _addProcessWithName(
    name: string,
    process: cp.ChildProcess,
    controller: AbortController,
    showMessages: boolean = true
  ) {
    this._processes.set(name, {
      process,
      controller,
    });

    process.stdout?.on("data", (chunk) => {
      showMessages && console.log(chunk.toString());
    });

    process.stderr?.on("data", (err) => {
      showMessages && console.log({ err: err.toString() });
      this._stopProcessWithName(name);
    });
  }

  private _execRunner<T>(script: string): Promise<T | null> {
    return new Promise((res, rej) => {
      cp.exec(script, (error, outString) => {
        if (error) {
          return rej(error);
        }
        const body = JSON.parse(outString);
        return res(body);
      });
    });
  }
}

export const KeyManagementService = new Service();
