import { config } from "dotenv";
import { appConfig, IAppConfig } from "./appConfig";
import { cookieConfig, ICookieConfig } from "./cookieConfig";
import { databaseConfig, IDatabaseConfig } from "./dbConfig";
import { emailConfig, IEmailConfig } from "./emailConfig";
import { IJwtConfig, jwtConfig } from "./jwtConfig";
import { IKmsScriptsConfig, kmsScriptsConfig } from "./kmsConfig";

config();

interface MainConfig {
  database: IDatabaseConfig;
  app: IAppConfig;
  email: IEmailConfig;
  jwt: IJwtConfig;
  cookie: ICookieConfig;
  kmsConfig: IKmsScriptsConfig
}

const configMainnet: MainConfig = {
  database: databaseConfig,
  app: appConfig,
  email: emailConfig,
  jwt: jwtConfig,
  cookie: cookieConfig,
  kmsConfig: kmsScriptsConfig
};

export const mainConfig: MainConfig = configMainnet;
