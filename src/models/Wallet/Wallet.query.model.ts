import { SendTatumTransactionResponse } from "../../types/SendTatumTransactionResponse";
import {
  ProtectedRequestWithBody,
  ResponseWithBody,
} from "../../types/TypedRequestAndResponse";

interface SendEthBody {
  from: string;
  to: string;
  amount: string;
}
export type SendEthRequest = ProtectedRequestWithBody<SendEthBody>;
export type SendEthResponse = ResponseWithBody<SendTatumTransactionResponse>;
