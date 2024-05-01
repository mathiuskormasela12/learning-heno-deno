import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { checkJsonRequestBody } from '@/middlewares';
import CreateMovieSchema from './schemas/CreateMovieSchema.ts';
import { MovieService } from '@/services';
import { IMovie, IResponse, IResponseWithData } from '@/types';

const movieRouter = new Hono();

movieRouter.post(
  '/movie',
  checkJsonRequestBody,
  zValidator('json', CreateMovieSchema, (result, context) => {
    if (!result.success) {
      return context.json<IResponse>({
        statusCode: 400,
        errors: result?.error?.errors?.map((err) => ({
          [`${err.path}`]: err.message,
        }), 400),
      });
    }
  }),
  async (context) => {
    const movieService = new MovieService();
    const data = await context.req.valid('json');
    const result = await movieService.createMovie(data);
    return context.json<IResponse>(result, result.statusCode);
  },
);

movieRouter.get('/movies', async (context) => {
  const movieService = new MovieService();
  const result = await movieService.getMovies();
  return context.json<IResponseWithData<IMovie[]>>(result, result.statusCode);
});

movieRouter.delete('/movies', async (context) => {
  const movieService = new MovieService();
  const result = await movieService.deleteMovies();
  return context.json<IResponse>(result, result.statusCode);
});

movieRouter.delete('/movie/:id', async (context) => {
  const movieService = new MovieService();
  const result = await movieService.deleteMovie(
    Number(await context.req.param('id')),
  );
  return context.json<IResponse>(result, result.statusCode);
});

movieRouter.put(
  '/movie/:id',
  checkJsonRequestBody,
  zValidator('json', CreateMovieSchema, (result, context) => {
    if (!result.success) {
      return context.json<IResponse>({
        statusCode: 400,
        errors: result?.error?.errors?.map((err) => ({
          [`${err.path}`]: err.message,
        }), 400),
      });
    }
  }),
  async (context) => {
    const movieService = new MovieService();
    const data = await context.req.valid('json');
    const result = await movieService.updateMovie(
      data,
      Number(await context.req.param('id')),
    );
    return context.json<IResponse>(result, result.statusCode);
  },
);

export default movieRouter;
