import { createMiddleware } from 'hono/factory';
import { IResponse } from '@/types';
import { logger } from '@/helpers';

const checkJsonRequestBody = createMiddleware(async (context, next) => {
  try {
    await context.req.json();
    return await next();
  } catch (err) {
    logger.error(err);
    return context.json<IResponse>({
      statusCode: 400,
      errors: [
        {
          'request.body': 'Request body is required',
        },
      ],
    });
  }
});

export default checkJsonRequestBody;
