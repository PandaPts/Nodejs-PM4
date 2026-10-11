const fs = require('node:fs');
const path = require('node:path');

const filePath = path.join(__dirname, 'activity.log');
const writeStream = fs.createWriteStream(filePath, { flags: 'a' });
const lines = [
  new Date().toLocaleString(),
  'Application started',
  'User signed in',
  'Operation completed',
];

writeStream.on('error', (error) => {
  console.error('Ошибка записи журнала:', error.message);
  process.exitCode = 1;
});

writeStream.on('finish', () => {
  console.log('Дата и три строки добавлены; предыдущие данные сохранены.');
});

for (const line of lines) {
  writeStream.write(`${line}\n`);
}

writeStream.end();
