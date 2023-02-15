import {
  RequestWithBody,
  RequestWithBodyAndParams,
  RequestWithQuery,
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

export type ChangePasswordRequest = RequestWithBodyAndParams<
  ChangePasswordBody,
  { id: string }
>;

export type GetUsersRequest = RequestWithQuery<{
  skip?: string;
  limit?: string;
}>;
