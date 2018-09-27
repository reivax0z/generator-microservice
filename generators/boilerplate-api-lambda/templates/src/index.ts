const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const uuid = require('uuid');

import { logger } from './common/logger';
import { myFunction } from './services/myService';

const app = express();

// create application/json parser
app.use(bodyParser.json({ extended: true }));

const v1 = express.Router();

// Primary request handler
const myServiceV1 = (req, res): Promise<void> => {

  const correlationId = _.isNil(req.get('ds-correlation-id')) ?
    uuid.v4() : req.get('ds-correlation-id');

  logger.debug({
    correlationId,
    message: `#myServiceV1 - body: ${JSON.stringify(req.body)}`,
  });

  return myFunction({ correlationId, body: req.body })
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

v1.use('/my-service', express.Router().post('/', myServiceV1));
app.use('/v1', v1);

export = { handler: serverless(app) };
