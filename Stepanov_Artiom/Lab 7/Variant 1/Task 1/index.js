const fs = require('node:fs');
const path = require('node:path');

const filePath = path.join(__dirname, 'input.txt');
const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });

readStream.on('open', (fileDescriptor) => {
  console.log(`Файл открыт (дескриптор: ${fileDescriptor}).`);
});

readStream.on('data', (chunk) => {
  console.log('Получен чанк:');
  console.log(chunk);
});

readStream.on('end', () => {
  console.log('Чтение завершено.');
});

readStream.on('error', (error) => {
  console.error('Ошибка чтения файла:', error.message);
  process.exitCode = 1;
});
