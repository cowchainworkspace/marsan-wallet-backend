import { NextFunction, Request, Response } from "express";
import {
  ChangePasswordRequest,
  GetUsersRequest,
  LoginRequest,
  RegisterRequest,
  VerifyRequest,
} from "../models/User/User.query.models";
import { UserService } from "../services/User.service";
import { ApiError } from "../exceptions/ApiError";
import { castToNumber } from "../utils/castToNumber";
import { CodeService } from "../services/Code.service";
class Controller {
  public async register(
    req: RegisterRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { email } = req.body;
      await CodeService.sendCode(email);
      res.json({ message: `Code sended to the ${email} ` });
    } catch (error) {
      next(error);
    }
  }

  public async verify(req: VerifyRequest, res: Response, next: NextFunction) {
    try {
      const { email, password, code } = req.body;
      const user = await UserService.register(email, password, code);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  public async login(req: LoginRequest, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await UserService.login(email, password);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  public async logout(req: Request, res: Response, next: NextFunction) {
    try {
      res.json({ message: "Success" });
    } catch (error) {
      next(error);
    }
  }

  public async changePassword(
    req: ChangePasswordRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { password } = req.body;
      const { id } = req.params;

      const user = await UserService.changePasswordById(id, password);
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
