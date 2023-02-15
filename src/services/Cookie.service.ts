import { Response } from "express";
import { mainConfig } from "../config/mainConfig";

class Service {
  private _cookie_cfg = mainConfig.cookie;

  public setCookie(res: Response, refreshToken: string) {
    res.cookie(this._cookie_cfg.refreshCookieName, refreshToken, {
      maxAge: this._cookie_cfg.refreshCookieLife,
      httpOnly: true,
    });
  }

  public removeCookie(res: Response) {
    res.clearCookie(this._cookie_cfg.refreshCookieName);
  }
}

export const CookieService = new Service();
