import { NextFunction } from "express";
import {
  GetPriceRequest,
  GetTatumPriceResponse,
} from "../models/Price/Price.query.models";
import { TatumUtilsService } from "../services/Tatum/Utils.service";

class Controller {
  public async getPrice(
    req: GetPriceRequest,
    res: GetTatumPriceResponse,
    next: NextFunction
  ) {
    try {
      const { token } = req.params;
      const { pair } = req.query;

      const result = await TatumUtilsService.getPrice(token, pair);

      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

export const PriceController = new Controller();
