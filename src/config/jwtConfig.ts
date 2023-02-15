import { accessLifeMultiplier, refreshLifeMultiplier } from "../constants";

export interface IJwtConfig {
  accessTokenSecret: string;
  refreshTokenSecret: string;
  accessTokenLife: string;
  refreshTokenLife: string;
}

const configSelector = (): IJwtConfig => {
  const accessTokenSecret = process.env.JWT_ACCESS_SECRET;
  const refreshTokenSecret = process.env.JWT_REFRESH_SECRET;

  if (!accessTokenSecret || !refreshTokenSecret) {
    throw new Error("[Jwt config]: JWT secrets not defined");
  }

  return {
    accessTokenSecret,
    refreshTokenSecret,
    accessTokenLife: `${accessLifeMultiplier}h`,
    refreshTokenLife: `${refreshLifeMultiplier}d`,
  };
};

export const jwtConfig = configSelector();
