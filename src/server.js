import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './utils/env.js';
// import StudentCollection from './db/models/Student.js';
import * as studentServices from './services/students.js';

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

  app.get('/students', async (req, res) => {
    const data = await studentServices.getAllStudents();

    res.json({
      status: 200,
      message: 'Successfully found contacts with DB',
      data,
    });
  });

  app.get('/students/:contactId', async (req, res) => {
    const { contactId } = req.params;
    const data = await studentServices.getStudentById(contactId);

    if (!data) {
      return res.status(404).json({
        message: 'Contact not found',
      });
    }
    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data,
    });
  });

  app.use('*', (req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  const port = Number(env('PORT', 3000));

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};
