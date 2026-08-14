import { DatabaseSync } from "node:sqlite";
import { mkdirSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const databasePath = resolve("database/warehouse/cargo-ship/cargo_ship.db");
const schemaPath = resolve("database/warehouse/cargo-ship/cargo_ship_schema.sql");

mkdirSync(dirname(databasePath), { recursive: true });

export const db = new DatabaseSync(databasePath);

const schema = readFileSync(schemaPath, "utf8");

db.exec(schema);

export function closeDatabase() {
  db.close();
}
