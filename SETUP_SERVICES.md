# Настройка и деплой

## 1) Быстрый деплой (Docker)

Требования: Docker и docker-compose на сервере.

### Подготовьте `server/.env`:
```
PORT=3000
CORS_ORIGIN=*
DATABASE_URL="file:./dev.db"
```

### Запуск:
```
docker compose build
docker compose up -d
```

Клиент доступен на 80 порту, API проксируется по `/api`, WebSocket — `/socket.io`.

## 2. Установка зависимостей

```bash
cd server
npm install
```

## 3. Создание и применение миграций

```bash
# Создание миграции для услуг
npx prisma migrate dev --name add_services

# Генерация Prisma клиента
npx prisma generate
```

## 4. Заполнение базы данных услугами

```bash
# Запуск скрипта заполнения
npm run seed
```

## 5. Запуск сервера (локально)

```bash
# В режиме разработки
npm run dev

# Или в продакшене
npm start
```

## 6. API Endpoints

### Получить все услуги
```
GET /api/services
```

### Получить услугу по ID
```
GET /api/services/:id
```

### Создать услугу (требует авторизации)
```
POST /api/services
Body: {
  "name": "Название услуги",
  "description": "Описание услуги",
  "duration": "Время проведения",
  "price": "Цена"
}
```

### Обновить услугу (требует авторизации)
```
PUT /api/services/:id
```

### Удалить услугу (требует авторизации)
```
DELETE /api/services/:id
```

## 7. Структура данных услуги

```typescript
interface Service {
  id: string;
  name: string;
  description: string;
  duration?: string;
  price?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
```

## 8. Интеграция с фронтендом

Фронтенд автоматически загружает услуги из API при открытии DigitalMenu и ServiceSelectionDrawer.

### Redux Store
- `services/services` - массив всех услуг
- `services/loading` - состояние загрузки
- `services/error` - ошибки

### Селекторы
- `selectServices` - получить все услуги
- `selectServicesLoading` - состояние загрузки
- `selectServicesError` - ошибки

### Операции
- `fetchServices()` - загрузить все услуги
- `fetchServiceById(id)` - загрузить услугу по ID
