export interface GetPriceResponse {
  basePair: string;
  source: string;
  timestamp: number;
  value: string;
  id: string;
}

export interface GetAccountBalanceResponse {
  balance: string;
}
