import { kmsScriptCreator } from "../utils/kmsScriptCreator";

export interface IKmsScriptsConfig {
  scripts: {
    startDaemon: string;
    generateManagedWallet: string;
    exportWallets: string;
    getManagedWallet: string;
    getPrivateKey: string;
    getAddress: string;
  };
  daemonPeriod: number;
}

const configSelector = (): IKmsScriptsConfig => {
  return {
    scripts: {
      startDaemon: kmsScriptCreator(
        `daemon --external-url=http://192.168.57.63`
      ),
      generateManagedWallet: kmsScriptCreator(`generatemanagedwallet`),
      exportWallets: kmsScriptCreator("export"),
      getManagedWallet: kmsScriptCreator("getmanagedwallet"),
      getPrivateKey: kmsScriptCreator("getprivatekey"),
      getAddress: kmsScriptCreator("getaddress"),
    },
    daemonPeriod: 10,
  };
};

export const kmsScriptsConfig = configSelector();
