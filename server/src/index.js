import http from 'http';
import { Server as IOServer } from 'socket.io';
import prisma from '../prisma/prisma.js';
import { startServer } from './server.js';
import { registerSocketHandlers, setIo } from '../socket/index.js';
import { env } from './utils/env.js';

const bootstrap = async () => {
  await prisma.$connect();
  console.log('Connected to SQLite via Prisma');

  const app = startServer();
  const server = http.createServer(app);

  const corsOrigin = env('CORS_ORIGIN', '*');
  const io = new IOServer(server, {
    cors: {
      origin: corsOrigin === '*' ? true : corsOrigin,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    },
  });

  setIo(io);
  registerSocketHandlers(io);

  const PORT = Number(env('PORT', '3000'));
  server.listen(PORT, () => {
    console.log(`Server (HTTP+WS) is running on port ${PORT}`);
  });
};

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
