import { transports } from 'winston';
const winston = require('winston');

const fbsLogFormat = winston.format.printf((info) => {
  return `${info.timestamp} [${info.label}] ${info.level}: ${info.correlationId} - ${info.message}`;
});

const logger = winston.createLogger({
  level: process.env.LOGGER_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.label({ label: 'my-service' }),
    winston.format.timestamp(),
    fbsLogFormat,
  ),
  transports: [new transports.Console()],
});

export { logger };
