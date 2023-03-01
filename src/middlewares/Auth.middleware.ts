import { NextFunction, Response } from "express";
import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import { ApiError } from "../exceptions/ApiError";
import { TokenService } from "../services/Token.service";
import { ProtectedRequest } from "../types/TypedRequestAndResponse";

export const authMiddleware = async (
  req: ProtectedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }

    const userData = TokenService.validateAccessToken(accessToken);

    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }

    req.user = userData;

    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
};

export const authMiddlewareWs = async (
  socket: Socket,
  next: (err?: ExtendedError) => void
) => {
  try {
    const accessToken = socket.handshake.auth?.token;
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }

    const userData = TokenService.validateAccessToken(accessToken);

    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }

    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
};
