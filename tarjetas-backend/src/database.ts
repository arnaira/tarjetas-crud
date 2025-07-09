import * as mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';
dotenv.config();

export async function getConnection() {
  return await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '1234567',
    database: process.env.DB_NAME || 'crud',
  });
}
