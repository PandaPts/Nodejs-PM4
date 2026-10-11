// Лабораторная работа 9, Вариант 1.
require('dotenv').config();

const events = require('./events');
const { processTransfer } = require('./transfers');

// Задание 1: загружаем критический лимит из файла .env.
const limit = Number(process.env.LIMIT);

if (!Number.isFinite(limit) || limit <= 0) {
  console.error('Переменная LIMIT в .env должна быть положительным числом.');
  process.exitCode = 1;
} else {
  // Задание 2: подписываемся на события обычного перевода и тревоги.
  events.on('transfer', (amount) => {
    console.log(`Успешный перевод: ${amount}`);
  });

  events.on('fraud-alert', (amount) => {
    console.log(`[ALARM] Подозрительная активность: ${amount}!`);
  });

  console.log(`Мониторинг запущен. Лимит подозрительного перевода: ${limit}`);

  // Задание 3: проверяем случайный перевод каждые три секунды.
  setInterval(() => {
    const amount = Math.floor(Math.random() * 10000) + 1;
    processTransfer(amount, limit);
  }, 3000);
}
