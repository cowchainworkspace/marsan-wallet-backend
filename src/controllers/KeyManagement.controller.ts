import { NextFunction, Request, Response } from "express";
import { mainConfig } from "../config/mainConfig";
import {
  CreateManagedWalletRequest,
  GetManagedWalletAddressRequest,
  GetManagedWalletRequest,
  StartListenRequestWithQueryAndBody,
} from "../models/KeyManagement/KeyManagement.query.models";
import { KeyManagementService } from "../services/KeyManagement.service";
import { WalletService } from "../services/Wallet.service";
import { MessageResponse } from "../types/TypedRequestAndResponse";
import { castToNumber } from "../utils/castToNumber";
import { checkBooleanString } from "../utils/checkBooleanString";

class Controller {
  public async start(
    req: StartListenRequestWithQueryAndBody,
    res: MessageResponse,
    next: NextFunction
  ) {
    try {
      const { chains } = req.body;
      const { period, messages } = req.query;

      const numPeriod = castToNumber(period, mainConfig.kmsConfig.daemonPeriod);
      const isShowMessages = checkBooleanString(messages);

      await KeyManagementService.startListenTransactions(
        chains,
        numPeriod,
        isShowMessages
      );

      res.json({ message: "Successfully started daemon" });
    } catch (error) {
      next(error);
    }
  }

  public async stop(req: Request, res: MessageResponse, next: NextFunction) {
    try {
      await KeyManagementService.stopListenTransactions();

      res.json({ message: "Successfully stopped daemon" });
    } catch (error) {
      next(error);
    }
  }

  public async getManagedWallet(
    req: GetManagedWalletRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { signatureId } = req.params;
      const wallet = await KeyManagementService.getManagedWallet(signatureId);

      res.json(wallet);
    } catch (error) {
      next(error);
    }
  }

  public async getWalletAddress(
    req: GetManagedWalletAddressRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { signatureId } = req.params;
      const address = await KeyManagementService.getAddress(signatureId);

      res.json(address);
    } catch (error) {
      next(error);
    }
  }

  public async createManagedWallet(
    req: CreateManagedWalletRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { chain } = req.body;
      const { userId } = req.params;
      const wallet = await WalletService.createWallet(chain, userId);

      res.json(wallet);
    } catch (error) {
      next(error);
    }
  }
}

export const KeyManagementController = new Controller();
