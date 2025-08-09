import { startServer } from './server.js';
import prisma from '../prisma/prisma.js';

const bootstrap = async () => {
  await prisma.$connect();

  startServer();
};

bootstrap();
