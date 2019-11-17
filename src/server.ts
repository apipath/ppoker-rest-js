import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as morgan from 'morgan';
import { Logger } from 'winston';

import routes from './routes';
import { buildErrorHandler, notFoundHandler } from './errors';

interface Writer {
  write: (a: any) => void;
}

interface Options {
  logger: Logger;
  stream: Writer;
}

function createServer({ logger, stream }: Options) {
  const app = express();
  app.use(cors());
  app.use(morgan('combined', { stream }));
  app.use(helmet());
  app.use(bodyParser.json());
  app.use(routes);
  app.use(notFoundHandler);
  app.use(buildErrorHandler(logger));
  return app;
}

export default createServer;
