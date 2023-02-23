import { config } from "dotenv";
import { EnvironmentList } from "../types/enums/EnvironmentList";
import { appConfig, IAppConfig } from "./appConfig";
import { cookieConfig, ICookieConfig } from "./cookieConfig";
import { databaseConfig, IDatabaseConfig } from "./dbConfig";
import { emailConfig, IEmailConfig } from "./emailConfig";
import { IJwtConfig, jwtConfig } from "./jwtConfig";
import { IKmsScriptsConfig, kmsScriptsConfig } from "./kmsConfig";
import { ITatumApiConfig, tatumApiConfig } from "./tatumApiConfig";

config();

interface MainConfig {
  database: IDatabaseConfig;
  app: IAppConfig;
  email: IEmailConfig;
  jwt: IJwtConfig;
  cookie: ICookieConfig;
  kmsConfig: IKmsScriptsConfig;
  tatumApi: ITatumApiConfig;
  isMainnet: boolean;
}

const configSelector = (): MainConfig => {
  const configMainnet: MainConfig = {
    database: databaseConfig,
    app: appConfig,
    email: emailConfig,
    jwt: jwtConfig,
    cookie: cookieConfig,
    kmsConfig: kmsScriptsConfig,
    tatumApi: tatumApiConfig,
    isMainnet: false,
  };

  return configMainnet;
};

export const mainConfig: MainConfig = configSelector();
