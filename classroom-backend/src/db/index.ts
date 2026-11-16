import { config } from 'dotenv';
import { relations } from 'drizzle-orm/_relations';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not configured');
}

export const pool = new Pool({
  connectionString,
});

export const db = drizzle({ client: pool});