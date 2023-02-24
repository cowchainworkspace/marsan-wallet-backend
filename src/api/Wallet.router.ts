import { Router } from "express";
import { WalletController } from "../controllers/Wallet.controller";
import { authMiddleware } from "../middlewares/Auth.middleware";

export const WalletRouter = Router()

WalletRouter.post('/send/eth', authMiddleware, WalletController.sendEth)