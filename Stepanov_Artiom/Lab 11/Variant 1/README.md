# Лабораторная работа 11 — Вариант 1

## Запуск

Из этой папки выполните:

```sh
node server.js
```

API слушает порт `3000`. Ответы, включая ошибки, возвращаются в JSON.

## Где выполнены задания

1. **GET /devices** — начальное устройство и обработчик GET находятся в `server.js`.
2. **Фильтр по статусу** — обработчик `GET /devices?status=...` находится в `server.js`.
3. **Добавление устройства** — обработчик POST читает JSON, задаёт новый ID и возвращает `201 Created`.
4. **Валидация** — POST без непустого поля `name` возвращает `400 Bad Request`.
5. **Логирование** — каждый POST печатает `[ADD]: Добавлено устройство [имя]` в консоль сервера.

## Проверка через cURL

```sh
curl -i http://localhost:3000/devices
curl -i "http://localhost:3000/devices?status=work"
curl -i -X POST http://localhost:3000/devices -H "Content-Type: application/json" -d "{\"name\":\"Принтер\",\"status\":\"repair\"}"
curl -i -X POST http://localhost:3000/devices -H "Content-Type: application/json" -d "{\"status\":\"repair\"}"
```

Данные хранятся в памяти процесса и сбрасываются при перезапуске сервера.
