# SlotMe

SlotMe — сервіс для керування послугами та бронюванням. Стек: **Node.js**, **Express**, **React (Vite)**, **Socket.IO**, **SQLite (Prisma)**. Є Docker‑деплой з реверс‑проксі Nginx у клієнті.

## Функціонал
- Послуги: список послуг, перегляд деталі, статус активності.
- Бронювання: вибір дати, вибір часу, створення/скасування бронювань, список моїх бронювань.
- Авторизація: вхід за email‑кодом (верифікаційний код на пошту), сесії з JWT.
- Файли: роздача `uploads/` зі сторони бекенда.
- Real‑time: Socket.IO для майбутніх фіч (чат/статуси).

## Архітектура
```
slotme
├── client/                 # React + Vite, прод збірка на Nginx
│   ├── src/
│   ├── nginx.conf          # proxy /api, /socket.io → server
│   └── Dockerfile
├── server/                 # Express API + Socket.IO
│   ├── src/
│   │   ├── controllers/    # auth, user, service, timeSlot
│   │   ├── routers/        # /api/user, /api/services, /api/time-slots
│   │   ├── middlewares/    # validateBody, authenticate, errors
│   │   ├── services/       # бізнес‑логіка (auth, timeSlot, service, user)
│   │   ├── utils/          # mailer, env, tokens, sessions
│   │   └── server.js,index.js
│   ├── prisma/             # SQLite (file:./dev.db), Prisma schema/migrations
│   ├── uploads/            # завантаження/статичні файли
│   └── Dockerfile
└── docker-compose.yml      # server + client (порт 80)
```

## Флоу авторизації (email‑код)
1) Клієнт надсилає `POST /api/user/send-code { email }` — генеруємо/перевикористовуємо код, шлемо через SMTP (`server/src/utils/mailer.js`).
2) Клієнт підтверджує `POST /api/user/verify-code { email, code }` — логін, створення сесії, повертаються `accessToken`, `refreshToken`.
3) Рефреш: `POST /api/user/refresh { refreshToken }`.
4) Логаут: `POST /api/user/logout` (Authorization: Bearer accessToken).

## Флоу бронювання
1) Слоти за датою: `GET /api/time-slots/:yyyy-mm-dd` → масив статусів.
2) Створити бронювання: `POST /api/time-slots/bookings { slotId, serviceId, userId, date }` (потрібен токен).
3) Скасувати: `DELETE /api/time-slots/bookings/:bookingId`.
4) Мої бронювання: `GET /api/time-slots/bookings/me` (за токеном).

## API (скорочено)
- `POST /api/user/send-code` → відправити код на email.
- `POST /api/user/verify-code` → увійти кодом, отримати JWT.
- `POST /api/user/refresh` → оновити JWT.
- `POST /api/user/logout` → вийти.
- `GET /api/services` / `GET /api/services/:id`.
- `GET /api/time-slots/:yyyy-mm-dd`.
- `POST /api/time-slots/bookings` / `DELETE /api/time-slots/bookings/:id` / `GET /api/time-slots/bookings/me`.

## ENV (server/.env)
Обов’язково створіть `server/.env`:
```
PORT=3000
CORS_ORIGIN=*
DATABASE_URL="file:./dev.db"

# JWT
JWT_ACCESS_SECRET=<random_long_secret>
JWT_REFRESH_SECRET=<random_long_secret>

# SMTP (приклад для Gmail: App Password)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=you@gmail.com
SMTP_PASS=<app_password>
SMTP_FROM=SlotMe <you@gmail.com>
```

## Запуск у Docker
```bash
docker compose build
docker compose up -d
```
- Клієнт: `http://<HOST_IP>/` (порт 80).
- Клієнт проксить `/api` та `/socket.io` на сервер.
- Постійнi дані: `server/prisma/dev.db`, `server/uploads/` (volume‑маунти в compose).

## Dev‑запуск локально (без Docker)
```bash
# server
cd server && npm i && npm run dev

# client (інший термінал)
cd client && npm i && npm run dev
```
- API: `http://localhost:3000/api`
- Client: `http://localhost:5173` (у dev прямі запити на 3000, у проді — через Nginx)

## Нотатки
- CORS: керується `CORS_ORIGIN` (у проді вкажіть свій домен).
- Mobile/iOS: `theme-color` та iOS meta для статус‑бара; фон сторінки поза контентом — сірий.
- Swiper: кастомні кнопки навігації з явним білим `stroke` SVG.
- Drawer: без фіксованої висоти, bottom‑anchored, висота за контентом.
- Axios/Socket.IO: same‑origin (`/api`, `/socket.io`) для роботи з телефону у локальній мережі.
