import { app } from './server';
import { logger } from './common/logger';

const SERVER_PORT = process.env.SERVER_PORT || 8080;

// start the server
app.listen(SERVER_PORT, () => {
  logger.debug(`Server up and listening on port=${SERVER_PORT}`);
});
