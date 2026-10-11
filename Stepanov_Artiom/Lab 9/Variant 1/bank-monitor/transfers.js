// Лабораторная работа 9, Вариант 1 — Задания 2 и 3: проверка лимита и отправка события.
const events = require('./events');

function processTransfer(amount, limit) {
  if (amount > limit) {
    events.emit('fraud-alert', amount);
    return;
  }

  events.emit('transfer', amount);
}

module.exports = { processTransfer };
