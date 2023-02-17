import { Router } from "express";
import { KeyManagementController } from "../controllers/KeyManagement.controller";

export const KeyManagementRouter = Router();

// KeyManagementRouter.post("/start", KeyManagementController.start);
// KeyManagementRouter.post("/stop", KeyManagementController.stop);

// KeyManagementRouter.post(
//   "/wallets",
//   KeyManagementController.createManagedWallet
// );

KeyManagementRouter.get(
  "/wallets/:signatureId",
  KeyManagementController.getManagedWallet
);

KeyManagementRouter.get(
  "/wallets/address/:signatureId",
  KeyManagementController.getWalletAddress
);

// KeyManagementRouter.get('/wallets')
