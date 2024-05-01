import { logger } from '@/helpers';
import { DatabaseMigration } from '@/models';

try {
  const result = await DatabaseMigration.migrate();
  logger.info(result);
} catch (err) {
  logger.error((err as Error).message);
}
