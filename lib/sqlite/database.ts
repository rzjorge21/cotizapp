import * as SQLite from "expo-sqlite";
import { create_table_statement } from "./create_tables";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";

export async function getDatabase() {
  try {
    const internalDbName = "quot_v1.db";
    const sqlDir = FileSystem.documentDirectory + "SQLite/";

    // Verifica si el archivo de base de datos ya existe
    if (!(await FileSystem.getInfoAsync(sqlDir + internalDbName)).exists) {
      await FileSystem.makeDirectoryAsync(sqlDir, { intermediates: true });
      const asset = Asset.fromModule(require("../../assets/db/quot_v1.db"));
      await FileSystem.downloadAsync(asset.uri, sqlDir + internalDbName);
    }

    // Abre la base de datos
    const db = await SQLite.openDatabaseAsync(internalDbName);
    return db;
  } catch (error) {
    console.error("Error getting db: ", error);
    throw error;
  }
}

export async function initDatabase() {
  try {
    // Abre la base de datos
    const db = await getDatabase();

    // Ejecuta las declaraciones SQL
    const sqlFileContent = create_table_statement;
    const sqlStatements = sqlFileContent
      .split(";")
      .map((stmt: string) => stmt.trim())
      .filter((stmt: string) => stmt.length);

    sqlStatements.map(async (stmt: string) => {
      await db.execAsync(stmt);
    });
  } catch (error) {
    console.error("Error reading or executing SQL file: ", error);
    throw error;
  }
}
