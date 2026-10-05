const path = require('node:path');

console.log(`Папка выполнения: ${__dirname}`);
console.log(`Полный путь к файлу: ${__filename}`);
console.log(`Имя файла: ${path.basename(__filename)}`);
console.log(`Расширение файла: ${path.extname(__filename)}`);
console.log(`Папка файла: ${path.dirname(__filename)}`);
