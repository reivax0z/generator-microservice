import { createLogger, format, transports } from 'winston';

const DEPLOYMENT_ID = process.env.DEPLOYMENT_ID;

const logFormat = format.printf((info) => {
  return `${info.timestamp} [${info.label}] [deployment-id: ${DEPLOYMENT_ID}] - ${info.level}: ` +
    `${info.correlationId} - ${info.message}`;
});

const logger = createLogger({
  level: process.env.LOGGER_LEVEL || 'info',
  format: format.combine(
    format.label({ label: 'my-service' }),
    format.timestamp(),
    logFormat,
  ),
  transports: [new transports.Console()],
});

export { logger };
