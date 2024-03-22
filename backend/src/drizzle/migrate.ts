import { migrate } from "drizzle-orm/postgres-js/migrator";
import db from "./db";

export const migrateDB = async () => {
  console.log("migrating database");
  if (!db) {
    console.log("migration failed");
    return;
  }
  await migrate(db, { migrationsFolder: "drizzle" });
  console.log("sucessfully migrated");
};

migrateDB();
