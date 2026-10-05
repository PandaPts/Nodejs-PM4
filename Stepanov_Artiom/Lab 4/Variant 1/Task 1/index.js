const fs = require('node:fs');
const path = require('node:path');

const dataDirectory = path.join(__dirname, '..', 'data');
const inventoryPath = path.join(dataDirectory, 'inventory.txt');

try {
  if (!fs.existsSync(dataDirectory)) {
    fs.mkdirSync(dataDirectory, { recursive: true });
  }

  fs.writeFileSync(inventoryPath, 'Название товара: Количество');
  console.log('Инвентарь инициализирован.');
} catch (error) {
  console.error('Не удалось инициализировать инвентарь:', error.message);
  process.exitCode = 1;
}
