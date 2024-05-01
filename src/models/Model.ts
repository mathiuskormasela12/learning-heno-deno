import { Client } from 'mysql/mod.ts';
import db from './db.ts';
import { ExecuteResult } from 'mysql/src/connection.ts';

export type Option<T> = {
  where: T;
};

abstract class Model<T> {
  private database: Client;

  constructor() {
    this.database = db;
  }

  protected get db(): Client {
    return this.database;
  }

  public abstract create(data: T): Promise<ExecuteResult>;

  public abstract findAll(
    projections?: Partial<Record<keyof T, boolean>>,
    option?: Option<Partial<T>>,
  ): Promise<T[]>;

  public abstract delete(option?: Option<Partial<T>>): Promise<ExecuteResult>;

  public abstract update(
    data: T,
    option?: Option<Partial<T>>,
  ): Promise<ExecuteResult>;
}

export default Model;
