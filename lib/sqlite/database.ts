import * as SQLite from "expo-sqlite";
import { create_table_statement } from "./create_tables";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import { Logger } from "@/utils/logger";

export async function getDatabase() {
  try {
    const internalDbName = "quot_v1.db";
    const sqlDir = FileSystem.documentDirectory + "SQLite/";
    Logger.log(`🥫 Opening database ${internalDbName}.`);

    if (!(await FileSystem.getInfoAsync(sqlDir)).exists) {
      await FileSystem.makeDirectoryAsync(sqlDir, { intermediates: true });
    }

    if (!(await FileSystem.getInfoAsync(sqlDir + internalDbName)).exists) {
      Logger.log(`🥫 ${internalDbName} doesn't exists, creating a new one.`);
      const asset = Asset.fromModule(require("../../assets/db/quot_v1.db"));
      await asset.downloadAsync();
      await FileSystem.downloadAsync(asset.uri, sqlDir + internalDbName);
    }

    const db = await SQLite.openDatabaseAsync(internalDbName);
    Logger.log(`🥫 ${internalDbName} database was opened succesfully.`);
    return db;
  } catch (error) {
    Logger.log(`❌ Error getting db: ${error}`);
    throw error;
  }
}

export async function initDatabase() {
  try {
    const db = await getDatabase();

    const sqlFileContent = create_table_statement;
    const sqlStatements = sqlFileContent
      .split(";")
      .map((stmt: string) => stmt.trim())
      .filter((stmt: string) => stmt.length);

    Logger.log(`🥫 Executing sql statements.`);
    sqlStatements.map(async (stmt: string) => {
      await db.execAsync(stmt);
    });
    Logger.log(`🥫 Sql statements executed succesfully.`);
  } catch (error) {
    Logger.log(`❌ Error reading or executing SQL file: ${error}`);
    throw error;
  }
}

export async function removeDatabase() {
  try {
    Logger.log(`🥫 Removing database.`);
    const sqlDir = FileSystem.documentDirectory + "SQLite/";
    await FileSystem.deleteAsync(sqlDir + "quot_v1.db", { idempotent: true });
    Logger.log(`🥫 Database removed succesfully.`);
  } catch (error) {
    Logger.log(`❌ Error removing database: ${error}`);
    throw error;
  }
}
