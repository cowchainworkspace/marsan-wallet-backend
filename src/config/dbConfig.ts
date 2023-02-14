import { config } from "dotenv";
import { EnvironmentList } from "../types/enums/EnvironmentList";

config();

export interface IDatabaseConfig {
  dbUrl: string;
  dbName: string
}

const configSelector = (): IDatabaseConfig => {
  const network = process.env.NETWORK as EnvironmentList | undefined;

  if (!network || !EnvironmentList[network]) {
    throw new Error(
      '[Database config selector]: required env variable "NETWORK" not defined or invalid'
    );
  }

  const DB_PATH = `DB_URL_${network.toUpperCase()}`;

  const db_url = process.env[DB_PATH];

  if (!db_url) {
    throw new Error(
      `[Database config selector]: required env variable "${DB_PATH}" not defined or invalid`
    );
  }

  return { dbUrl: db_url, dbName: `marsan_db` };
};

export const databaseConfig = configSelector();
