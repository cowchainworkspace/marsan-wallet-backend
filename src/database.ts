import mongoose, { connect } from "mongoose";
import { mainConfig } from "./config/mainConfig";

export const databaseConnect = async () => {
  mongoose.set("strictQuery", false);

  const db = await connect(mainConfig.database.dbUrl, {
    dbName: mainConfig.database.dbName,
  });

  db.connection.once("open", () => console.log("✔️ Connected to database"));
};
