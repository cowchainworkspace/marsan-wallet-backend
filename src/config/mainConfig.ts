import { config } from "dotenv";
import { appConfig, IAppConfig } from "./appConfig";
import { databaseConfig, IDatabaseConfig } from "./dbConfig";

config();

interface MainConfig {
  database: IDatabaseConfig;
  app: IAppConfig;
}

const configMainnet: MainConfig = {
  database: databaseConfig,
  app: appConfig,
};

export const mainConfig: MainConfig = configMainnet;
