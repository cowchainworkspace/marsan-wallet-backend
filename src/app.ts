import express from "express";
import { UserRouter } from "./api/User.router";
import { mainConfig } from "./config/mainConfig";
import cors from "cors";
import { errorMiddleware } from "./middlewares/Error.middleware";
import { invalidPathMiddleware } from "./middlewares/InvalidPath.middleware";
import cookieParser from "cookie-parser";
import { KeyManagementRouter } from "./api/KeyManagement.router";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));

app.use("/users", UserRouter);
app.use("/kms", KeyManagementRouter);
app.use("*", invalidPathMiddleware);
app.use(errorMiddleware);

export const startApp = () => {
  app.listen(mainConfig.app.port, async () => {
    try {
      console.log(`🚀 Server is started at PORT: ${mainConfig.app.port}`);
    } catch (error) {
      console.error(error);
    }
  });
};
