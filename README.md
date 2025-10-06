# Real Time Chat

This is a real-time chat application built with **Node.js**, **Express**, **React (Vite)**, **Socket.IO**, **PostgreSQL**, and **Prisma**. The project is fully dockerized for easy development and deployment.

## Prerequisites

- Docker & Docker Compose
- Node.js v20+
- npm or yarn
- PostgreSQL (optional if using Docker)

## Project Structure

```
real-time-chat
├── client
│   ├── src
│   ├── Dockerfile
│   └── package.json
├── server
│   ├── prisma
│   ├── socket
│   ├── src
│   ├── uploads
│   ├── Dockerfile
│   ├── .env.example
│   ├── .env
│   └── package.json
└── docker-compose.yml
```

## Environment Variables

Create a `.env` file in the `server` folder (you can copy from `.env.example`):

```
PORT=3000
BASE_URL=http://localhost:3000

JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret

POSTGRES_USER=your_postgres_user
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_DB=your_postgres_db
POSTGRES_URL=postgresql://user:password@localhost:5432/dbname?schema=public
```

## Ports

| Service  | Port |
| -------- | ---- |
| Client   | 5173 |
| Server   | 3000 |
| Database | 5432 |

## Docker Setup

#### Build and start the application using Docker Compose:

```bash
docker-compose --env-file ./server/.env up
```

This will start three services:

- db: PostgreSQL database
- server: Node.js backend
- client: React frontend

#### Stop containers

```bash
docker-compose --env-file ./server/.env down
```

## Prisma

#### Prisma is used for database ORM. After updating the schema, run:

```bash
npx prisma generate       # Generate Prisma client
npx prisma migrate dev    # Apply migrations to the database
```

## Scripts

### Client

```bash
npm install # Install dependencies
npm run dev # Run development server
npm run build # Build production version
```

### Server

```bash
npm install # Install dependencies
npm run dev # Run development server
npm start # Start server
```

## Notes

- Prisma is used for database ORM
- Socket.IO handles real-time communication
- The frontend runs on port 5173
- The backend runs on port 3000
