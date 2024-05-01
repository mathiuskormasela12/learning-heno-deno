import { Client } from 'mysql/mod.ts';
import config from '@/config';

const db = await new Client().connect({
  hostname: config.DB_HOST,
  port: config.DB_PORT,
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  db: config.DB_NAME,
});

export default db;
