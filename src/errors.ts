import * as HttpStatus from 'http-status-codes';
import * as express from 'express'; // eslint-disable-line
import * as winston from 'winston';

type HttpStatusCodesMap = typeof HttpStatus;
export type HttpStatusCode = Extract<
  HttpStatusCodesMap[keyof HttpStatusCodesMap],
  number
>;

class ApiError implements Error {
  public name: string;

  constructor(
    public status: HttpStatusCode,
    public code: string,
    public message: string,
  ) {
    this.status = status;
    this.code = code;
    this.message = message;
    this.name = HttpStatus.getStatusText(status);
  }

  public toJson() {
    const { status, code, message } = this;
    return {
      status,
      code,
      message,
    };
  }

  public toString() {
    return `${this.name}: [${this.status}:${this.code}] ${this.message}`;
  }
}

export class NotFoundError extends ApiError {
  constructor(code: string, message: string) {
    super(HttpStatus.NOT_FOUND, code, message);
  }
}

export class ForbiddenError extends ApiError {
  constructor(code: string, message: string) {
    super(HttpStatus.FORBIDDEN, code, message);
  }
}

export class InternalServerError extends ApiError {
  constructor(code: string, message: string) {
    super(HttpStatus.INTERNAL_SERVER_ERROR, code, message);
  }
}

export class UnprocessableEntityError extends ApiError {
  constructor(code: string, message: string) {
    super(HttpStatus.UNPROCESSABLE_ENTITY, code, message);
  }
}

export class BadRequestError extends ApiError {
  constructor(code: string, message: string) {
    super(HttpStatus.BAD_REQUEST, code, message);
  }
}

function isApiError(obj: unknown): obj is ApiError {
  return typeof obj === 'object' && 'status' in obj;
}

export function buildErrorHandler(logger: winston.Logger) {
  return function errorHandler(
    err: ApiError | Error | undefined,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction, // eslint-disable-line
  ) {
    if (isApiError(err)) {
      res.status(err.status).send({ error: err.toJson() });
    } else {
      const error = new InternalServerError(
        'UNEXPECTED_ERROR',
        err.message || 'Unknown error',
      );
      res.status(error.status).send({ error: error.toJson() });
      logger.error(error.message, { error });
    }
  };
}

export function notFoundHandler(
  _req: express.Request,
  _res: express.Response,
  next: express.NextFunction,
) {
  next(new NotFoundError('NOT_FOUND', 'Invalid Path'));
}
