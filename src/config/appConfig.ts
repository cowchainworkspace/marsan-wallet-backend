import { defaultPort } from "../constants";
import { castToNumber } from "../utils/castToNumber";

export interface IAppConfig {
  port: number;
  bcryptSalt: number;
  emailSendDelay: number;
}

const configSelector = (): IAppConfig => {
  const port = castToNumber(process.env.PORT, defaultPort);

  return {
    port: port ?? defaultPort,
    bcryptSalt: 4,
    emailSendDelay: 60,
  };
};

export const appConfig = configSelector();
