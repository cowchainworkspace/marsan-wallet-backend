import { NextFunction, Request, Response } from "express";
import { ApiError } from "../exceptions/ApiError";

export const invalidPathMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    next(ApiError.NotFound("Enpdoint path is not exist"));
  } catch (error) {
    next(error);
  }
};
