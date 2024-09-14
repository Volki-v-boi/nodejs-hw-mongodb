import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './utils/env.js';

import contactsRouter from './routers/contacts.js';
import notFoundHendler from './middlewares/notFoundHandler.js';
import errorHendler from './middlewares/errorHandler.js';

export const setupServer = () => {
  const app = express();

  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });

  app.use(logger);
  app.use(cors());
  app.use(express.json());

  app.use('/contacts', contactsRouter);

  app.use(notFoundHendler);

  app.use(errorHendler);

  const port = Number(env('PORT', 3000));

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};
