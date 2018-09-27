const express = require('express');
const _ = require('lodash');
const uuid = require('uuid');

import { myFunction } from '../services/myService';
import { logger } from '../common/logger';

const myServiceRouter = express.Router();

const myServiceHandler = (req, res): Promise<void> => {

  if (!('ds-correlation-id' in req.headers)) {
    req.headers['ds-correlation-id'] = uuid.v4();
  }

  const correlationId = req.headers['ds-correlation-id'];

  logger.debug({
    correlationId,
    message: `#myServiceV1 - body: ${JSON.stringify(req.body)}`,
  });

  return Promise.resolve()
    .then(() => myFunction({ correlationId, body: req.body }))
    .then(() => res.status(200).send({
      correlationId,
      time: new Date().toISOString(),
      status: 200,
      data: 'OK',
    }))
    .catch(err => res.status(500).send({
      correlationId,
      time: new Date().toISOString(),
      status: 500,
      errors: [{ code: '500101', message: 'Internal Server Error' }],
    }));
};

myServiceRouter.post('/', myServiceHandler);

export { myServiceRouter };
