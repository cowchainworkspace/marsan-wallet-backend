import { NextFunction } from "express";
import { ApiError } from "../exceptions/ApiError";
import {
  GetPriceRequest,
  GetTatumPriceResponse,
} from "../models/Price/Price.query.models";
import {
  SendEthRequest,
  SendEthResponse,
} from "../models/Wallet/Wallet.query.model";
import { TatumEthService } from "../services/Tatum/Blockchain/Eth.service";
import { TatumUtilsService } from "../services/Tatum/Utils.service";

class Controller {
  public async sendEth(
    req: SendEthRequest,
    res: SendEthResponse,
    next: NextFunction
  ) {
    try {
      const { from, to, amount } = req.body;
      const userId = req.user?.id;

      if (!userId) {
        return next(ApiError.UnauthorizedError());
      }

      const result = await TatumEthService.sendEth(from, to, amount, userId);

      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

export const WalletController = new Controller();
