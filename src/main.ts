import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { csrf } from 'hono/csrf';
import { secureHeaders } from 'hono/secure-headers';
import { compress } from 'hono/compress';
import { logger as honoLogger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import config from '@/config';
import { movieRouter } from '@/routers';
import { DatabaseMigration } from '@/models';
import { logger } from '@/helpers';

const hono = new Hono();

// Setup logger
hono.use(honoLogger());

// Setup Csrf
hono.use(csrf());

// Setup Cors
hono.use(cors({
  origin: config.CLIENTS,
}));

// Setup Secure Headers
hono.use(secureHeaders());

// Setup Compression
hono.use(compress());

// Setup Pretty Json
hono.use(prettyJSON());

// Migration
try {
  const result = await DatabaseMigration.migrate();
  logger.info(result);
} catch (err) {
  logger.error((err as Error).message);
}

// Define all routes
hono.route('/api/v1', movieRouter);

Deno.serve({ port: config.PORT }, hono.fetch);
