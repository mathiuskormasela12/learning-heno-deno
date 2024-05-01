import { IMovie, IResponse, IResponseWithData } from '@/types';
import { MovieModel } from '@/models';
import { logger } from '@/helpers';

class MovieService {
  public async createMovie(data: Omit<IMovie, 'id'>): Promise<IResponse> {
    try {
      const result = await MovieModel.create(data);
      if (typeof result.affectedRows === 'number') {
        return {
          statusCode: 201,
          message: 'Movie created',
        };
      }

      return {
        statusCode: 400,
        message: 'Failed to create movie',
      };
    } catch (err) {
      logger.error(err);
      return {
        statusCode: 500,
        errors: [
          {
            database: (err as Error).message,
          },
        ],
      };
    }
  }

  public async getMovies(): Promise<IResponseWithData<IMovie[]>> {
    try {
      const movies = await MovieModel.findAll({
        id: true,
        title: true,
        description: true,
        releaseDate: true,
        writer: true,
      });

      if (movies.length > 0) {
        return {
          statusCode: 200,
          data: movies,
        };
      } else {
        return {
          statusCode: 404,
          message: 'Movies are empty',
        };
      }
    } catch (err) {
      logger.error(err);
      return {
        statusCode: 500,
        errors: [
          {
            database: (err as Error).message,
          },
        ],
      };
    }
  }

  public async deleteMovies(): Promise<IResponse> {
    try {
      const movies = await MovieModel.findAll();

      if (movies.length > 0) {
        try {
          const result = await MovieModel.delete();

          if (
            typeof result?.affectedRows === 'number' && result.affectedRows > 0
          ) {
            return {
              statusCode: 200,
              message: 'All movies are deleted successfully',
            };
          } else {
            return {
              statusCode: 400,
              message: 'Failed to delete movies',
            };
          }
        } catch (err) {
          logger.error(err);
          return {
            statusCode: 500,
            errors: [
              {
                database: (err as Error).message,
              },
            ],
          };
        }
      } else {
        return {
          statusCode: 404,
          message: 'Movies are empty',
        };
      }
    } catch (err) {
      logger.error(err);
      return {
        statusCode: 500,
        errors: [
          {
            database: (err as Error).message,
          },
        ],
      };
    }
  }

  public async deleteMovie(id: number): Promise<IResponse> {
    try {
      const movies = await MovieModel.findAll(undefined, { where: { id } });

      if (movies.length > 0) {
        try {
          const result = await MovieModel.delete({ where: { id } });

          if (
            typeof result?.affectedRows === 'number' && result.affectedRows > 0
          ) {
            return {
              statusCode: 200,
              message: 'The movie is deleted successfully',
            };
          } else {
            return {
              statusCode: 400,
              message: 'Failed to delete a movie',
            };
          }
        } catch (err) {
          logger.error(err);
          return {
            statusCode: 500,
            errors: [
              {
                database: (err as Error).message,
              },
            ],
          };
        }
      } else {
        return {
          statusCode: 404,
          message: 'Movies is not found',
        };
      }
    } catch (err) {
      logger.error(err);
      return {
        statusCode: 500,
        errors: [
          {
            database: (err as Error).message,
          },
        ],
      };
    }
  }

  public async updateMovie(
    data: Omit<IMovie, 'id'>,
    id: number,
  ): Promise<IResponse> {
    console.info('INI', id)
    try {
      const result = await MovieModel.update({
        ...data,
      }, { where: { id } });
      if (typeof result.affectedRows === 'number') {
        return {
          statusCode: 201,
          message: 'Movie Updated',
        };
      }

      return {
        statusCode: 400,
        message: 'Failed to update movie',
      };
    } catch (err) {
      logger.error(err);
      return {
        statusCode: 500,
        errors: [
          {
            database: (err as Error).message,
          },
        ],
      };
    }
  }
}

export default MovieService;
