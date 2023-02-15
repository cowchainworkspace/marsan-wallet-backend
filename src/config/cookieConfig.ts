import {
  accessLifeMultiplier,
  DAY,
  HOUR,
  refreshLifeMultiplier,
} from "../constants";

export interface ICookieConfig {
  accessCookieName: string;
  refreshCookieName: string;
  accessCookieLife: number;
  refreshCookieLife: number;
}

const configSelector = (): ICookieConfig => {
  return {
    accessCookieName: "accessToken",
    refreshCookieName: "refreshToken",
    accessCookieLife: accessLifeMultiplier * HOUR,
    refreshCookieLife: refreshLifeMultiplier * DAY,
  };
};

export const cookieConfig = configSelector();
