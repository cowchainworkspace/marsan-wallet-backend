import { NetworksList } from "../../types/enums/NetworksList";
import {
  RequestWithBodyAndParams,
  RequestWithBodyAndQuery,
  RequestWithParams,
} from "../../types/TypedRequestAndResponse";

interface ChainsBody {
  chains: NetworksList[];
}
interface ChainBody {
  chain: NetworksList;
}

interface Signature {
  signatureId: string;
}

export type StartListenRequestWithQueryAndBody = RequestWithBodyAndQuery<
  ChainsBody,
  {
    period?: string;
    messages?: string;
  }
>;

export type GetManagedWalletRequest = RequestWithParams<Signature>;
export type CreateManagedWalletRequest = RequestWithBodyAndParams<
  ChainBody,
  { userId: string }
>;
