import express from "express";
import { UserRouter } from "./api/User.router";
import { mainConfig } from "./config/mainConfig";
import cors from "cors";
import { errorMiddleware } from "./middlewares/Error.middleware";
import { invalidPathMiddleware } from "./middlewares/InvalidPath.middleware";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", UserRouter);
app.use("*", invalidPathMiddleware);
app.use(errorMiddleware)

export const startApp = () => {
  app.listen(mainConfig.app.port, async () => {
    try {
      console.log(`🚀 Server is started at PORT: ${mainConfig.app.port}`);
    } catch (error) {
      console.error(error);
    }
  });
};
