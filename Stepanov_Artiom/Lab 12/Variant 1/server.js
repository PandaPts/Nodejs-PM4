// Лабораторная работа 12, Вариант 1: потоковая раздача медиафайлов.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const PORT = 3000;
const PUBLIC_DIR = path.resolve(__dirname, 'public');
// Задания 1, 3 и 4: известные типы для страницы, стилей и медиафайлов.
const MIME_TYPES = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.mp3': 'audio/mpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml; charset=utf-8',
};

function sendError(res, statusCode, message) {
  if (res.headersSent) {
    res.destroy();
    return;
  }

  res.writeHead(statusCode, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end(message);
}

function getByteRange(rangeHeader, fileSize) {
  const match = /^bytes=(\d*)-(\d*)$/.exec(rangeHeader || '');
  if (!match || fileSize === 0) {
    return null;
  }

  let start;
  let end;

  if (match[1] === '') {
    const suffixLength = Number(match[2]);
    if (suffixLength <= 0) {
      return null;
    }

    start = Math.max(fileSize - suffixLength, 0);
    end = fileSize - 1;
  } else {
    start = Number(match[1]);
    end = match[2] === '' ? fileSize - 1 : Number(match[2]);
    if (start > end || start >= fileSize) {
      return null;
    }
    end = Math.min(end, fileSize - 1);
  }

  return { start, end };
}

function handleRequest(req, res) {
  try {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.writeHead(405, { Allow: 'GET, HEAD', 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Метод не поддерживается');
      return;
    }

    let pathname;
    try {
      pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    } catch {
      sendError(res, 400, 'Некорректный URL');
      return;
    }

    // Задание 1: корневой адрес открывает страницу галереи.
    if (pathname === '/') {
      pathname = '/index.html';
    }

    const filePath = path.resolve(PUBLIC_DIR, `.${pathname}`);
    const relativePath = path.relative(PUBLIC_DIR, filePath);
    if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
      sendError(res, 403, 'Доступ запрещён');
      return;
    }

    let stats;
    try {
      fs.accessSync(filePath, fs.constants.R_OK);
      stats = fs.statSync(filePath);
    } catch (error) {
      if (error.code === 'ENOENT' || error.code === 'ENOTDIR') {
        sendError(res, 404, 'Файл не найден');
        return;
      }

      throw error;
    }

    if (!stats.isFile()) {
      sendError(res, 404, 'Файл не найден');
      return;
    }

    // Задание 5: журналируем путь к каждому файлу и его размер.
    console.log(`[FILE] ${filePath} — ${stats.size} байт`);

    // Задание 2: неизвестные расширения передаются как бинарные данные.
    const contentType = MIME_TYPES[path.extname(filePath).toLowerCase()]
      || 'application/octet-stream';

    if (req.method === 'HEAD') {
      res.writeHead(200, {
        'Content-Type': contentType,
        'Content-Length': stats.size,
      });
      res.end();
      return;
    }

    const rangeHeader = req.headers.range;
    const byteRange = rangeHeader ? getByteRange(rangeHeader, stats.size) : null;
    if (rangeHeader && !byteRange) {
      res.writeHead(416, {
        'Content-Range': `bytes */${stats.size}`,
        'Content-Type': 'text/plain; charset=utf-8',
      });
      res.end('Диапазон байтов недоступен');
      return;
    }

    const headers = {
      'Accept-Ranges': 'bytes',
      'Content-Type': contentType,
      'Content-Length': byteRange
        ? byteRange.end - byteRange.start + 1
        : stats.size,
    };
    if (byteRange) {
      headers['Content-Range'] = `bytes ${byteRange.start}-${byteRange.end}/${stats.size}`;
    }
    res.writeHead(byteRange ? 206 : 200, headers);

    // Задания 3 и 4: изображения и аудио отправляются файловым потоком.
    const fileStream = fs.createReadStream(
      filePath,
      byteRange ? { start: byteRange.start, end: byteRange.end } : undefined,
    );
    fileStream.on('error', (error) => {
      console.error(`Ошибка чтения ${filePath}:`, error.message);
      sendError(res, 500, 'Не удалось прочитать файл');
    });
    fileStream.pipe(res);
  } catch (error) {
    console.error('Ошибка обработки запроса:', error.message);
    sendError(res, 500, 'Внутренняя ошибка сервера');
  }
}

const server = http.createServer(handleRequest);

server.on('error', (error) => {
  console.error('Ошибка HTTP-сервера:', error.message);
  process.exitCode = 1;
});

server.listen(PORT, () => {
  console.log(`Медиа-галерея доступна: http://localhost:${PORT}`);
});
