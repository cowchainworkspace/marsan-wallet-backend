import { NetworksList } from "./enums/NetworksList";

export interface IGeneratedManagedWallet {
  signatureId: string;
  xpub: string;
}

export type ManagedWallet = Omit<IGeneratedManagedWallet, "signatureId"> & {
  mnemonic: string;
  chain: NetworksList;
  testnet: boolean;
};

export interface IAddress {
  address: string;
}

export interface IPrivateKey {
  privateKey: string;
}

export interface IExportedWallets {
  [x: IGeneratedManagedWallet["signatureId"]]: ManagedWallet;
}
