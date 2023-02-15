import { config } from "dotenv";
import { appConfig, IAppConfig } from "./appConfig";
import { cookieConfig, ICookieConfig } from "./cookieConfig";
import { databaseConfig, IDatabaseConfig } from "./dbConfig";
import { emailConfig, IEmailConfig } from "./emailConfig";
import { IJwtConfig, jwtConfig } from "./jwtConfig";

config();

interface MainConfig {
  database: IDatabaseConfig;
  app: IAppConfig;
  email: IEmailConfig;
  jwt: IJwtConfig;
  cookie: ICookieConfig;
}

const configMainnet: MainConfig = {
  database: databaseConfig,
  app: appConfig,
  email: emailConfig,
  jwt: jwtConfig,
  cookie: cookieConfig,
};

export const mainConfig: MainConfig = configMainnet;
