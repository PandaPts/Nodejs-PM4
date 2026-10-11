// Лабораторная работа 10, Вариант 1: HTTP-сервер.
const http = require('node:http');

const PORT = 3000;
const server = http.createServer((req, res) => {
  // Задание 4: записываем метод запроса и User-Agent каждого клиента.
  console.log(`Метод: ${req.method}; User-Agent: ${req.headers['user-agent'] || 'не указан'}`);

  const pathname = (req.url || '/').split('?')[0];

  if (pathname === '/admin') {
    // Задание 3: закрытый адрес возвращает 403 Forbidden.
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Доступ ограничен');
    return;
  }

  if (pathname === '/html') {
    // Задание 5: явно указываем HTML, чтобы браузер отобразил заголовок как тег.
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h1>Инфо-панель</h1>');
    return;
  }

  // Задания 1 и 2: приветствие и русский текст с корректной UTF-8 кодировкой.
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Server Alpha is active\nСистема готова к работе');
});

server.on('error', (error) => {
  console.error('Ошибка HTTP-сервера:', error.message);
  process.exitCode = 1;
});

server.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});
