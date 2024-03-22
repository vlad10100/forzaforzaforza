import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const db = () => {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) return;
  const client = postgres(databaseUrl);
  const db = drizzle(client, { schema });
  return db;
};
export default db();
