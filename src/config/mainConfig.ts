import { config } from "dotenv";
import { appConfig, IAppConfig } from "./appConfig";
import { databaseConfig, IDatabaseConfig } from "./dbConfig";
import { emailConfig, IEmailConfig } from "./emailConfig";

config();

interface MainConfig {
  database: IDatabaseConfig;
  app: IAppConfig;
  email: IEmailConfig
}

const configMainnet: MainConfig = {
  database: databaseConfig,
  app: appConfig,
  email: emailConfig
};

export const mainConfig: MainConfig = configMainnet;
