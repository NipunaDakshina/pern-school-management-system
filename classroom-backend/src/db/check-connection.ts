import { pool } from './index.js';

async function checkConnection() {
  try {
    const result = await pool.query('SELECT NOW()');

    console.log('PostgreSQL connected successfully!');
    console.log('Database time:', result.rows[0].now);
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

checkConnection();