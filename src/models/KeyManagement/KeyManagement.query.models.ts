import { UserDTO } from "../../dtos/User.dto";
import { NetworksList } from "../../types/enums/NetworksList";
import {
  ProtectedRequestWithBody,
  RequestWithBody,
  RequestWithBodyAndParams,
  RequestWithBodyAndQuery,
  RequestWithParams,
  RequestWithQuery,
  ResponseWithBody,
  TextMessage,
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
