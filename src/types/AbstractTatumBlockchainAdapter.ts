export abstract class AbstractTatumBlockchainAdapter {
  getBalance: (arg: any) => Promise<string>;
}