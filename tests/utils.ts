import * as request from 'supertest';
import { getConnection } from 'typeorm';
import * as winston from 'winston';

import createServer from '../src/server';
import { createDatabaseConnection } from '../src/db';

export const setup = createDatabaseConnection;
export const clearDb = () => getConnection().synchronize(true);

function buildNoopLogger() {
  const logger = winston.createLogger({
    transports: [new winston.transports.Console()],
    exitOnError: false,
  });
  logger.transports.pop();

  return logger;
}

const app = createServer({
  logger: buildNoopLogger(),
  stream: { write: () => {} },
});

const setDefaultHeaders = (httpRequest: request.Test) => {
  httpRequest.set('Accept', 'application/json');
};

export function get(url: string) {
  const httpRequest = request(app).get(url);
  setDefaultHeaders(httpRequest);
  return httpRequest;
}

export function post(url: string, body: any) {
  const httpRequest = request(app).post(url);
  httpRequest.send(body);
  setDefaultHeaders(httpRequest);
  return httpRequest;
}
