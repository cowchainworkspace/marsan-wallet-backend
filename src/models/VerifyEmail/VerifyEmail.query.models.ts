import {
  ResponseWithBody,
  TextMessage,
} from "../../types/TypedRequestAndResponse";
import { IVerifyEmail } from "./VerifyEmail.model";

export type VerifyEmailResponseWithMessage = ResponseWithBody<
  { data: IVerifyEmail } & TextMessage
>;
