const path = require('node:path');

const infoPath = path.join(__dirname, 'data', 'info.txt');

console.log(`Путь к файлу: ${infoPath}`);
console.log('Разбор пути:');
console.log(path.parse(infoPath));
