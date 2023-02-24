import { NextFunction } from "express";
import {
  GetPriceRequest,
  GetTatumPriceResponse,
} from "../models/Price/Price.query.models";
import { PriceService } from "../services/Price.service";

class Controller {
  public async getPrice(
    req: GetPriceRequest,
    res: GetTatumPriceResponse,
    next: NextFunction
  ) {
    try {
      const { token } = req.params;
      const { pair } = req.query;

      const result = await PriceService.getPrice(token, pair);

      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

export const PriceController = new Controller();
