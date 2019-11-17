require('dotenv-defaults').config();

import logger, { stream } from './logger';
import { createConnection } from './db';
import createServer from './server';

async function initialize(port: Number) {
  try {
    await createConnection();
    const app = createServer({ logger, stream });
    app.listen(port, () => logger.info(`Server started`, { port }));
  } catch ({ message, stack }) {
    logger.error('Unexpected error', {
      error: message,
      stack: stack,
    });
  }
}

initialize(parseInt(process.env.PORT, 10) || 3000);
