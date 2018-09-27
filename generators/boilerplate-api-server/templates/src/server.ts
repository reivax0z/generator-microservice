const express = require('express');
const bodyParser = require('body-parser');

import { myServiceRouter } from './routes/myService';

const app = express();

// create application/json parser
app.use(bodyParser.json({ extended: true }));

const v1 = express.Router();

// add all routes here
v1.use('/my-service', myServiceRouter);

app.use('/v1', v1);

export { app };
