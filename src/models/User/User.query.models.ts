import { UserDTO } from "../../dtos/User.dto";
import {
  ProtectedRequestWithBody,
  RequestWithBody,
  RequestWithQuery,
  ResponseWithBody,
  TextMessage,
} from "../../types/TypedRequestAndResponse";

export interface AuthorithationBody {
  email: string;
  password: string;
}

export type CheckEmailBody = Omit<AuthorithationBody, "password">;
export type ChangePasswordBody = Omit<AuthorithationBody, "email">;

export interface EmailVerificationBody extends CheckEmailBody {
  code: string;
}

export type RegisterRequest = RequestWithBody<AuthorithationBody>;
export type CheckEmailRequest = RequestWithBody<CheckEmailBody>;
export type EmailVerifyRequest = RequestWithBody<EmailVerificationBody>;
export type LoginRequest = RequestWithBody<AuthorithationBody>;

export type ChangePasswordRequest =
  ProtectedRequestWithBody<ChangePasswordBody>;

export type GetUsersRequest = RequestWithQuery<{
  skip?: string;
  limit?: string;
}>;

export type UserResponseBody = {
  accessToken: string;
  refreshToken: string;
  user: UserDTO;
};

export type UserResponseWithMessage = ResponseWithBody<
  { data: UserResponseBody } & TextMessage
>;
export type UserResponse = ResponseWithBody<UserResponseBody>;
