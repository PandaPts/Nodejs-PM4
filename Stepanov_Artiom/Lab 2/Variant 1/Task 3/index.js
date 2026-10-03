const os = require('node:os');

const totalMemoryGb = os.totalmem() / 1024 ** 3;

console.log(`Платформа: ${os.platform()}`);
console.log(`Имя компьютера: ${os.hostname()}`);
console.log(`Домашняя папка: ${os.homedir()}`);
console.log(`Оперативная память: ${totalMemoryGb.toFixed(2)} ГБ`);
