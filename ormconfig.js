const tsconfig = require('./tsconfig.json');
const rootDir =
  process.env.NODE_ENV === 'development'
    ? 'src'
    : `${tsconfig.compilerOptions.outDir}/src`;

module.exports = {
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true,
  logging: false,
  entities: [`${rootDir}/entity/**/*.{js,ts}`],
  migrations: [`${rootDir}/migration/**/*.{js,ts}`],
  subscribers: [`${rootDir}/subscriber/**/*.{js,ts}`],
  cli: {
    entitiesDir: `${rootDir}/entity`,
    migrationsDir: `${rootDir}/migration`,
    subscribersDir: `${rootDir}/subscriber`,
  },
};
