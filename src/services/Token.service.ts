import { JwtPayload, sign, verify } from "jsonwebtoken";
import { mainConfig } from "../config/mainConfig";
import { UserDTO } from "../dtos/User.dto";
import { TokenModel } from "../models/Token/Token.model";

class Service {
  private _jwtConfig = mainConfig.jwt;

  public generateTokens(payload: UserDTO) {
    const accessToken = sign(
      { ...payload },
      this._jwtConfig.accessTokenSecret,
      {
        expiresIn: this._jwtConfig.accessTokenLife,
      }
    );
    const refreshToken = sign(
      { ...payload },
      this._jwtConfig.refreshTokenSecret,
      {
        expiresIn: this._jwtConfig.refreshTokenLife,
      }
    );
    return {
      accessToken,
      refreshToken,
    };
  }

  public validateAccessToken(token: string) {
    try {
      const userData = verify(token, this._jwtConfig.accessTokenSecret);
      return userData as JwtPayload & UserDTO;
    } catch (e) {
      return null;
    }
  }

  public validateRefreshToken(token: string) {
    try {
      const userData = verify(token, this._jwtConfig.refreshTokenSecret);
      return userData as JwtPayload & UserDTO;
    } catch (e) {
      return null;
    }
  }

  async saveToken(userId: string, refreshToken: string) {
    const tokenData = await TokenModel.findByUser(userId);
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await TokenModel.createByUser(userId, refreshToken);
    return token;
  }

  async removeToken(refreshToken: string) {
    const tokenData = await TokenModel.deleteByToken(refreshToken);
    return tokenData;
  }

  async findToken(refreshToken: string) {
    const tokenData = await TokenModel.findByToken(refreshToken);
    return tokenData;
  }
}

export const TokenService = new Service();
