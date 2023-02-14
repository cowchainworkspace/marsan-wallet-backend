import {
  RequestWithBody,
  RequestWithBodyAndParams,
  RequestWithQuery,
} from "../../types/TypedRequestAndResponse";

export interface AuthorithationBody {
  email: string;
  password: string;
}

export interface VerificationBody extends AuthorithationBody {
  code: string;
}

export type RegistrationBody = Omit<AuthorithationBody, "password">;
export type ChangePasswordBody = Omit<AuthorithationBody, "email">;

export type RegisterRequest = RequestWithBody<RegistrationBody>;
export type VerifyRequest = RequestWithBody<VerificationBody>;
export type LoginRequest = RequestWithBody<AuthorithationBody>;

export type ChangePasswordRequest = RequestWithBodyAndParams<
  ChangePasswordBody,
  { id: string }
>;

export type GetUsersRequest = RequestWithQuery<{
  skip?: string;
  limit?: string;
}>;
