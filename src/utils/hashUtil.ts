import bcrypt from "bcrypt";
import { mainConfig } from "../config/mainConfig";

export const compareStringWithHash = async (incomingString: string, hash: string) => {
  try {
    const result = await bcrypt.compare(incomingString, hash);

    return result;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const generateHashFromString = async (code: string) => {
  const hashPassword = await bcrypt.hash(code, mainConfig.app.bcryptSalt);
  return hashPassword;
};
