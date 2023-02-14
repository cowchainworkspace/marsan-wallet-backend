import { ErrorRequestHandler } from "express";

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  const defaultError = "Internal server error";
  const serverStatus = err.status || 500;
  const serverMessage = err.status && err.message ? err.message : defaultError;
  const serverErrors: string[] = err.errors || [];

  console.error(`[Error middleware] error: `, err);

  return res.status(serverStatus).json({
    message: serverMessage,
    errors: serverErrors,
  });
};
