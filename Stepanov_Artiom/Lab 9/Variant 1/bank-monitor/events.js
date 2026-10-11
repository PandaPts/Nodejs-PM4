// Лабораторная работа 9, Вариант 1 — Задание 2: общий канал событий модулей.
const { EventEmitter } = require('node:events');

module.exports = new EventEmitter();
