const fs = require('node:fs');
const path = require('node:path');

const dataDirectory = path.join(__dirname, '..', 'data');
const temporaryLogPath = path.join(dataDirectory, 'temp_log.txt');
const inventoryPath = path.join(dataDirectory, 'inventory.txt');
const finalInventoryPath = path.join(dataDirectory, 'inventory_final.txt');

try {
  if (fs.existsSync(temporaryLogPath)) {
    fs.unlinkSync(temporaryLogPath);
    console.log('Временный файл удалён.');
  }

  fs.renameSync(inventoryPath, finalInventoryPath);
  console.log('Инвентарь переименован в inventory_final.txt.');
} catch (error) {
  console.error('Не удалось очистить систему:', error.message);
  process.exitCode = 1;
}
