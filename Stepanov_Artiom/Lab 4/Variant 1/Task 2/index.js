const fs = require('node:fs');
const path = require('node:path');

const inventoryPath = path.join(__dirname, '..', 'data', 'inventory.txt');

try {
  if (!fs.existsSync(inventoryPath)) {
    console.warn('Инвентарь не инициализирован');
  } else {
    const inventory = fs.readFileSync(inventoryPath, 'utf8');

    if (inventory.length === 0) {
      console.warn('Инвентарь не инициализирован');
    } else {
      console.log(inventory);
    }
  }
} catch (error) {
  console.error('Не удалось прочитать инвентарь:', error.message);
  process.exitCode = 1;
}
