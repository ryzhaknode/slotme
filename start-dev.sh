#!/bin/bash

# Запуск сервера и фронтенда одновременно

echo "🚀 Запуск сервера и фронтенда..."

# Запуск сервера в фоне
cd server
npm run dev &
SERVER_PID=$!

# Ждем немного, чтобы сервер запустился
sleep 3

# Запуск фронтенда в фоне
cd ../client
npm run dev &
CLIENT_PID=$!

echo "✅ Сервер запущен (PID: $SERVER_PID)"
echo "✅ Фронтенд запущен (PID: $CLIENT_PID)"
echo ""
echo "🌐 Сервер: http://localhost:3000"
echo "🌐 Фронтенд: http://localhost:5173"
echo ""
echo "Для остановки нажмите Ctrl+C"

# Ждем завершения процессов
wait $SERVER_PID $CLIENT_PID
