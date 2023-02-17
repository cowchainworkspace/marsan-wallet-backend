import { NextFunction, Response } from "express";
import { ApiError } from "../exceptions/ApiError";
import { TokenService } from "../services/Token.service";
import { ProtectedRequest } from "../types/TypedRequestAndResponse";

export const refreshMiddleware = async (
  req: ProtectedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return next(ApiError.UnauthorizedError());
    }

    const userData = TokenService.validateRefreshToken(refreshToken);

    if (!userData) {
      throw ApiError.UnauthorizedError();
    }

    req.user = userData;

    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
};
