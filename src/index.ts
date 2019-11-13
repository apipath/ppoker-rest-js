import 'reflect-metadata';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as morgan from 'morgan';

import routes from './routes';
import { buildErrorHandler, notFoundHandler } from './errors';
import logger, { stream } from './logger';
import { createConnection } from './db';

async function initialize(port: Number) {
  try {
    await createConnection();
    const app = express();
    app.use(cors());
    app.use(morgan('combined', { stream }));
    app.use(helmet());
    app.use(bodyParser.json());
    app.use(routes);
    app.use(notFoundHandler);
    app.use(buildErrorHandler(logger));
    app.listen(port, () => logger.info(`Server started`, { port }));
  } catch ({ message, stack }) {
    logger.error('Unexpected error', {
      error: message,
      stack: stack,
    });
  }
}

(initialize)(parseInt(process.env.PORT, 10) || 3000);
