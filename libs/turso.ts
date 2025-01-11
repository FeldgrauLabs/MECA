import { createClient } from "@libsql/client";

const DATABASE_URL = process.env.TURSO_DATABASE_URL;
const API_KEY = process.env.TURSO_API_KEY; 

export const turso = createClient({
  url: DATABASE_URL!,
  authToken: API_KEY!,
});