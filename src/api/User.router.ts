import { Router } from "express";
import { UserController } from "../controllers/User.controller";
import {
  accountCredentialsMiddleware,
  emailValidateMiddleware,
  passwordValidateMiddleware,
  verificationMiddleware,
} from "../middlewares/AccountCredentials.middleware";

export const UserRouter = Router();

UserRouter.post(
  "/register",
  emailValidateMiddleware,
  UserController.register
);

UserRouter.post(
  "/email/verify",
  verificationMiddleware,
  UserController.verify
);
UserRouter.post("/login", accountCredentialsMiddleware, UserController.login);
UserRouter.post("/logout", UserController.logout);
UserRouter.put(
  "/change-password/:id",
  passwordValidateMiddleware,
  UserController.changePassword
);
UserRouter.get("/", UserController.getAll);
