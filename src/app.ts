import express from "express";
import { UserRouter } from "./api/User.router";
import { mainConfig } from "./config/mainConfig";
import cors from "cors";
import { errorMiddleware } from "./middlewares/Error.middleware";
import { invalidPathMiddleware } from "./middlewares/InvalidPath.middleware";
import cookieParser from "cookie-parser";
import { KeyManagementRouter } from "./api/KeyManagement.router";
import { PriceRouter } from "./api/Price.router";
import { WalletRouter } from "./api/Wallet.router";
import { PriceWorker } from "./workers/Price.worker";
import { createServer } from "http";
import { Server } from "socket.io";
import { authMiddlewareWs } from "./middlewares/Auth.middleware";
import { PriceWs } from "./websockets/Price.ws";
import { SnapshotWorker } from "./workers/Snapshot.worker";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));

app.use("/users", UserRouter);
app.use("/kms", KeyManagementRouter);
app.use("/price", PriceRouter);
app.use("/wallet", WalletRouter);
app.use("*", invalidPathMiddleware);
app.use(errorMiddleware);

const httpServer = createServer(app);

export const io = new Server(httpServer, {
  cors: { origin: "*" },
});

// can't use with postman
io.use(authMiddlewareWs);
io.on("connection", (socket) => {
  PriceWs.subscribe(socket);
});

export const startApp = () => {
  httpServer.listen(mainConfig.app.port, async () => {
    try {
      console.log(`🚀 Server is started at PORT: ${mainConfig.app.port}`);
      PriceWorker.start();
      SnapshotWorker.start()
    } catch (error) {
      console.error(error);
    }
  });
};
