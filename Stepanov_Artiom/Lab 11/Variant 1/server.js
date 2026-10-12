// Лабораторная работа 11, Вариант 1: API учета оборудования.
const http = require('node:http');

const PORT = 3000;
// Задание 1: исходный список содержит как минимум одно устройство.
const devices = [
  { id: 1, name: 'Монитор', status: 'work' },
];

// Общее требование: все ответы API отправляются в формате JSON.
function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
  });
  res.end(JSON.stringify(data));
}

async function readJsonBody(req) {
  const chunks = [];

  for await (const chunk of req) {
    chunks.push(chunk);
  }

  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

async function handleRequest(req, res) {
  try {
    const requestUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

    // Задания 1 и 2: GET /devices возвращает список, а ?status= фильтрует его.
    if (requestUrl.pathname === '/devices' && req.method === 'GET') {
      const hasStatusFilter = requestUrl.searchParams.has('status');
      const status = requestUrl.searchParams.get('status');
      const result = hasStatusFilter
        ? devices.filter((device) => device.status === status)
        : devices;

      sendJson(res, 200, result);
      return;
    }

    // Задания 3, 4 и 5: POST создает устройство, проверяет name и записывает лог.
    if (requestUrl.pathname === '/devices' && req.method === 'POST') {
      let body;

      try {
        // Получаем JSON из тела POST-запроса.
        body = await readJsonBody(req);
      } catch (error) {
        if (!(error instanceof SyntaxError)) {
          throw error;
        }

        console.log('[ADD]: Добавлено устройство [не указано]');
        sendJson(res, 400, { error: 'Некорректный JSON в теле запроса.' });
        return;
      }

      const name = body && typeof body.name === 'string' ? body.name.trim() : '';
      // Задание 5: логируем каждый POST, даже если поле name отсутствует.
      console.log(`[ADD]: Добавлено устройство ${name || '[не указано]'}`);

      // Задание 4: name обязательно для создания устройства.
      if (!name) {
        sendJson(res, 400, { error: 'Поле name обязательно и должно быть непустой строкой.' });
        return;
      }

      const status =
        body && typeof body.status === 'string' && body.status.trim()
          ? body.status.trim()
          : 'work';
      const device = {
        // Задание 3: присваиваем ID на единицу больше наибольшего существующего.
        id: devices.reduce((maxId, item) => Math.max(maxId, item.id), 0) + 1,
        name,
        status,
      };

      devices.push(device);
      sendJson(res, 201, device);
      return;
    }

    sendJson(res, 404, { error: 'Маршрут не найден.' });
  } catch (error) {
    console.error('Ошибка обработки запроса:', error.message);
    if (!res.headersSent) {
      sendJson(res, 500, { error: 'Внутренняя ошибка сервера.' });
    } else {
      res.destroy(error);
    }
  }
}

const server = http.createServer((req, res) => {
  handleRequest(req, res);
});

server.on('error', (error) => {
  console.error('Ошибка HTTP-сервера:', error.message);
  process.exitCode = 1;
});

server.listen(PORT, () => {
  console.log(`API оборудования запущено: http://localhost:${PORT}`);
});
