const fs = require('node:fs');
const path = require('node:path');

const sourcePath = path.join(__dirname, '..', 'Task 1', 'input.txt');
const copyPath = path.join(__dirname, 'copy.txt');
const readStream = fs.createReadStream(sourcePath);
const writeStream = fs.createWriteStream(copyPath);

writeStream.on('finish', () => {
  console.log('Готово');
});

readStream.on('error', (error) => {
  console.error('Ошибка чтения файла:', error.message);
  process.exitCode = 1;
});

writeStream.on('error', (error) => {
  console.error('Ошибка записи копии:', error.message);
  process.exitCode = 1;
});

readStream.pipe(writeStream);
