import { StatusCode } from 'hono/utils/http-status';

export interface IResponse {
  statusCode: StatusCode;
  message?: string;
  errors?: Record<string, string>[];
}

export interface IResponseWithData<T> extends IResponse {
  data?: T;
}
