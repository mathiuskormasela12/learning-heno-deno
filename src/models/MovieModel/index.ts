import { ExecuteResult } from 'https://deno.land/x/mysql@v2.12.1/mod.ts';
import Model, { Option } from '../Model.ts';
import { IMovie } from '@/types';

class MovieModel extends Model<IMovie> {
  public async create<T extends Omit<IMovie, 'id'>>(
    data: T,
  ): Promise<ExecuteResult> {
    try {
      const result = await this.db.execute(
        `INSERT INTO movies(${Object.keys(data).join(',')}) VALUES(${
          Object.keys(data).map(() => '?').join(',')
        })`,
        [...Object.values(data)],
      );
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }

  public findAll(
    projections?: Partial<Record<keyof IMovie, boolean>>,
    option?: Option<Partial<IMovie>>,
  ): Promise<IMovie[]> {
    console.info(
      `SELECT ${
        !projections ? '*' : Object.keys(projections).map((key, index) => {
          const s = Object.values(projections)[index];
          if (s) {
            return key;
          } else {
            return '';
          }
        }).join(',')
      } FROM movies ${
        option?.where
          ? `WHERE ${
            Object.keys(option.where).map((key, index, array) => {
              if (index < (array.length - 1)) {
                return `${key}=${Object.values(option.where)[index]} AND `;
              } else {
                return `${key}=${Object.values(option.where)[index]} `;
              }
            })
          }`
          : ''
      };`,
    );
    try {
      const result = this.db.query(
        `SELECT ${
          !projections ? '*' : Object.keys(projections).map((key, index) => {
            const s = Object.values(projections)[index];
            if (s) {
              return key;
            } else {
              return '';
            }
          }).join(',')
        } FROM movies ${
          option?.where
            ? `WHERE ${
              Object.keys(option.where).map((key, index, array) => {
                if (index < (array.length - 1)) {
                  return `${key}='${Object.values(option.where)[index]}' AND `;
                } else {
                  return `${key}='${Object.values(option.where)[index]}'`;
                }
              })
            }`
            : ''
        };`,
      );
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }

  public async delete(
    option?: Option<Partial<IMovie>>,
  ): Promise<ExecuteResult> {
    const sql = `DELETE FROM movies ${
      option?.where
        ? `WHERE ${
          Object.keys(option.where).map((key, index, array) => {
            if (index < (array.length - 1)) {
              return `${key}='${Object.values(option.where)[index]}' AND `;
            } else {
              return `${key}='${Object.values(option.where)[index]}'`;
            }
          })
        }`
        : ''
    };`;
    try {
      const result = await this.db.execute(sql);
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }

  public async update(
    data: Partial<IMovie>,
    option?: Option<Partial<IMovie>>,
  ): Promise<ExecuteResult> {
    const sql = `UPDATE movies SET ${Object.keys(data).map((key, index) => {
        return `${key}=${(typeof Object.values(data)[index] === 'string') ? `'${Object.values(data)[index]}'` : Object.values(data)[index]}`
    })} ${
        option?.where
          ? `WHERE ${
            Object.keys(option.where).map((key, index, array) => {
              if (index < (array.length - 1)) {
                return `${key}='${Object.values(option.where)[index]}' AND `;
              } else {
                return `${key}='${Object.values(option.where)[index]}'`;
              }
            })
          }`
          : ''
      };`;
      console.info(sql)
    try {
      const result = await this.db.execute(
        sql,
      );
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default new MovieModel();
