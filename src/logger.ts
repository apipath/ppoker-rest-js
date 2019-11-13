// Taken from https://www.digitalocean.com/community/tutorials/how-to-use-winston-to-log-node-js-applications
import * as appRoot from 'app-root-path';
import * as winston from 'winston';

// define the custom settings for each transport (file, console)
const options = {
  // TODO: figure out what we want to do with the logs on prod
  file: {
    level: 'info',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const isProduction = process.env.NODE_ENV === 'production';

// instantiate a new Winston Logger with the settings defined above
const logger = winston.createLogger({
  transports: [
    isProduction && new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ].filter(Boolean),
  exitOnError: false, // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
export const stream = {
  write: function(info: any) {
    logger.info(info);
  },
};

export default logger;
