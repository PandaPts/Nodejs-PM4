const path = require('node:path');

const fileName = process.argv[2];

if (!fileName) {
  console.error('Укажите имя файла. Пример: node index.js report.txt');
  process.exitCode = 1;
} else {
  const filePath = path.join(__dirname, 'files', fileName);
  console.log(filePath);
}
