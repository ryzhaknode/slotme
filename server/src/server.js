import path from 'path';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

import router from './routers/index.js';

dotenv.config({ quiet: true });

export const startServer = () => {
  const app = express();

  // Абсолютний шлях до директорії server/uploads
  const uploadsPath = path.join(process.cwd(), 'uploads');

  // Раздаємо статику
  app.use('/uploads', express.static(uploadsPath));

  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
      limit: '100kb',
    }),
  );

  const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
  };

  app.use(cors(corsOptions));

  app.use('/api', router);

  app.use(/(.*)/, notFoundHandler);

  app.use(errorHandler);

  return app;
};
