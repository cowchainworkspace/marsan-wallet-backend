import { NextFunction, Request, Response } from "express";
import {
  ChangePasswordRequest,
  CheckEmailRequest,
  GetUsersRequest,
  LoginRequest,
  RegisterRequest,
  EmailVerifyRequest,
  UserResponseWithMessage,
  UserResponse,
} from "../models/User/User.query.models";
import { UserService } from "../services/User.service";
import { ApiError } from "../exceptions/ApiError";
import { castToNumber } from "../utils/castToNumber";
import { CodeService } from "../services/Code.service";
import { VerifyEmailService } from "../services/VerifyEmail.service";
import {
  MessageResponse,
  ProtectedRequest,
} from "../types/TypedRequestAndResponse";
import { VerifyEmailResponseWithMessage } from "../models/VerifyEmail/VerifyEmail.query.models";
import { CookieService } from "../services/Cookie.service";

class Controller {
  public async register(
    req: RegisterRequest,
    res: UserResponseWithMessage,
    next: NextFunction
  ) {
    try {
      const { email, password } = req.body;
      const user = await UserService.register(email, password);
      CookieService.setCookie(res, user.refreshToken);
      res.json({ message: `Successfully registered`, data: user });
    } catch (error) {
      next(error);
    }
  }

  public async checkEmail(
    req: CheckEmailRequest,
    res: MessageResponse,
    next: NextFunction
  ) {
    try {
      const { email } = req.body;
      await CodeService.sendCode(email);
      res.json({ message: `Code sended to the ${email}` });
    } catch (error) {
      next(error);
    }
  }

  public async verify(
    req: EmailVerifyRequest,
    res: VerifyEmailResponseWithMessage,
    next: NextFunction
  ) {
    try {
      const { email, code } = req.body;
      const verified = await VerifyEmailService.verify(email, code);
      res.json({ message: "Successfully verified", data: verified });
    } catch (error) {
      next(error);
    }
  }

  public async login(req: LoginRequest, res: UserResponse, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await UserService.login(email, password);
      CookieService.setCookie(res, user.refreshToken);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  public async logout(req: Request, res: MessageResponse, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      await UserService.logout(refreshToken);
      CookieService.removeCookie(res);
      res.json({ message: "Success" });
    } catch (error) {
      next(error);
    }
  }

  public async refresh(
    req: ProtectedRequest,
    res: UserResponse,
    next: NextFunction
  ) {
    try {
      const id = req.user?.id;

      if (!id) {
        return next(ApiError.UnauthorizedError());
      }

      const user = await UserService.refresh(id);

      CookieService.setCookie(res, user.refreshToken);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  public async changePassword(
    req: ChangePasswordRequest,
    res: UserResponse,
    next: NextFunction
  ) {
    try {
      const { password } = req.body;
      const id = req.user?.id;

      if (!id) {
        return next(ApiError.UnauthorizedError());
      }

      const user = await UserService.changePasswordById(id, password);
      CookieService.setCookie(res, user.refreshToken);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  public async getAll(req: GetUsersRequest, res: Response, next: NextFunction) {
    try {
      const maxLimit = 40;
      const { skip, limit } = req.query;

      const numSkip = castToNumber(skip, 0);
      const numLimit = castToNumber(limit, 10);

      if (numLimit > maxLimit) {
        return next(
          ApiError.BadRequest(
            `limit must be less than or equals to ${maxLimit}`
          )
        );
      }

      const users = await UserService.getAllUsers(numSkip, numLimit);
      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {}
}

export const UserController = new Controller();
