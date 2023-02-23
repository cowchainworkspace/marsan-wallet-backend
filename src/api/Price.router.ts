import { Router } from "express";
import { PriceController } from "../controllers/Price.controller";

export const PriceRouter = Router()

PriceRouter.get('/:token', PriceController.getPrice)