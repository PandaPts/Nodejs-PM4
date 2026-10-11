const fs = require('node:fs');
const path = require('node:path');

const filePath = path.join(__dirname, '..', 'Task 1', 'input.txt');
const readStream = fs.createReadStream(filePath, {
  highWaterMark: 512,
});
let chunkCount = 0;

readStream.on('data', (chunk) => {
  chunkCount += 1;
});

readStream.on('end', () => {
  console.log(`Размер чанка: 512 байт`);
  console.log(`Количество чанков: ${chunkCount}`);
});

readStream.on('error', (error) => {
  console.error('Ошибка чтения файла:', error.message);
  process.exitCode = 1;
});
