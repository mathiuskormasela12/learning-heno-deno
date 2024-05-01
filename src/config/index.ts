import { load } from 'https://deno.land/std@0.224.0/dotenv/mod.ts';

const env = await load();

export default {
  PORT: Number(env['SERVICE_APP_PORT'] || 3000),
  CLIENTS: env['SERVICE_APP_CLIENTS']?.split(',') || [],
  DB_HOST: env['SERVICE_APP_DB_HOST'],
  DB_PORT: Number(env['SERVICE_APP_DB_PORT'] || 3306),
  DB_USER: env['SERVICE_APP_DB_USER'],
  DB_PASSWORD: env['SERVICE_APP_DB_PASSWORD'],
  DB_NAME: env['SERVICE_APP_DB_NAME'],
};
