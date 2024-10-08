import * as SQLite from "expo-sqlite/legacy";
import { DATABASE_NAME } from "@/config";
import { create_table_statement } from "./create_tables";

const db = SQLite.openDatabase(DATABASE_NAME);

export function initDatabase() {
  try {
    const sqlFileContent = create_table_statement;

    const sqlStatements = sqlFileContent
      .split(";")
      .map((stmt : string) => stmt.trim())
      .filter((stmt : string) => stmt.length);

    db.transaction((tx) => {
      sqlStatements.forEach((stmt : string) => {
        tx.executeSql(stmt, [], () => {
          console.log("SQL statement executed successfully: ", stmt);
        });
      });
    });
  } catch (error) {
    console.error("Error reading or executing SQL file: ", error);
  }
}

export default db;
