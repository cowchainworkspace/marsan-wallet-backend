import { NextFunction, Request, Response } from "express";
import { AnyObject, Maybe, ObjectSchema, ValidationError } from "yup";
import { ApiError } from "../exceptions/ApiError";
import {
  accountCredentialsValidator,
  emailValidator,
  passwordValidator,
  verificationValidator,
} from "../validators/User.validator";

const validateModel =
  <A extends Maybe<AnyObject>, B, C>(validator: ObjectSchema<A, B, C>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      await validator.validate(body, { abortEarly: false });
      next();
    } catch (error) {
      if (error instanceof ValidationError) {
        return next(ApiError.BadRequest("Validation error", error.errors));
      }
      next(ApiError.BadRequest("Invalid arguments"));
    }
  };

export const accountCredentialsMiddleware = validateModel(
  accountCredentialsValidator
);

export const emailValidateMiddleware = validateModel(emailValidator);

export const verificationMiddleware = validateModel(verificationValidator);

export const passwordValidateMiddleware = validateModel(passwordValidator);