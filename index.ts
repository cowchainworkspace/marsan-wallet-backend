import { startApp } from "./src/app";
import { databaseConnect } from "./src/database";

const start = async () => {
  try {
    await databaseConnect();
    startApp();
  } catch (error) {
    if (error instanceof Error) {
      console.error(`[SERVER_ERROR]: ${error.message}`);
    }
    console.error(`[SERVER_ERROR]: Unhandled error`)
  }
};

start();
