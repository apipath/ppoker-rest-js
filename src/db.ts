import * as path from 'path';
import {
  createConnection as typeormCreateConnection,
  getConnectionOptions,
} from 'typeorm';

const staticOptions = {
  entities: [path.resolve(__dirname, 'entity/**/*')],
};

export async function createConnection() {
  const options = await getConnectionOptions();
  return typeormCreateConnection({ ...options, ...staticOptions });
}
