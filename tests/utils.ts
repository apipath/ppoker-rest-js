import * as request from 'supertest';
import { getConnection } from 'typeorm';
import * as winston from 'winston';

import createServer from '../src/server';
import { createConnection } from '../src/db';

export const setup = createConnection;
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
  httpRequest.set('Origin', 'http://localhost:3000');
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
