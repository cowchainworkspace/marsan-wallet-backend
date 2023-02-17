import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { UserDTO } from "../dtos/User.dto";

export type RequestWithBody<T> = Request<{}, {}, T>;
export type RequestWithQuery<T> = Request<{}, {}, {}, T>;
export type RequestWithParams<T> = Request<T>;
export type RequestWithBodyAndParams<T, K> = Request<K, {}, T>;
export type RequestWithBodyAndQuery<T, K> = Request<{}, {}, T, K>;

export type ProtectedRequest = Request & { user?: JwtPayload & UserDTO };

export type ProtectedRequestWithBody<T> = Request<{}, {}, T> & {
  user?: JwtPayload & UserDTO;
};
export type ProtectedRequestWithQuery<T> = Request<{}, {}, {}, T> & {
  user?: JwtPayload & UserDTO;
};
export type ProtectedRequestWithBodyAndParams<T, K> = Request<K, {}, T> & {
  user?: JwtPayload & UserDTO;
};

export type ResponseWithBody<T> = Response<T>;
export interface TextMessage {
  message: string;
}

export type MessageResponse = ResponseWithBody<TextMessage>;
