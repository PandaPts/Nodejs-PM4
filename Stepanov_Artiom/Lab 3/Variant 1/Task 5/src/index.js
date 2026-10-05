const path = require('node:path');

const configPath = path.join(__dirname, '..', 'config', 'app.json');
const parsedPath = path.parse(configPath);

console.log(`Путь к файлу: ${configPath}`);
console.log(`Имя файла: ${parsedPath.base}`);
console.log(`Расширение файла: ${parsedPath.ext}`);
