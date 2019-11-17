import * as path from 'path';
import { createConnection, getConnectionOptions } from 'typeorm';

const staticOptions = {
  entities: [path.resolve(__dirname, 'entity/**/*')],
};

export async function createDatabaseConnection() {
  const options = await getConnectionOptions();
  return createConnection({ ...options, ...staticOptions });
}
