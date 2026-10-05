const fs = require('node:fs');
const path = require('node:path');

const dataDirectory = path.join(__dirname, '..', 'data');
const inventoryPath = path.join(dataDirectory, 'inventory.txt');
const finalInventoryPath = path.join(dataDirectory, 'inventory_final.txt');

function addProduct(product, quantity) {
  try {
    const targetPath = fs.existsSync(inventoryPath)
      ? inventoryPath
      : finalInventoryPath;

    fs.appendFileSync(targetPath, `\n${product}: ${quantity}`, { flag: 'a' });
    console.log(`Добавлен товар: ${product}: ${quantity}`);
  } catch (error) {
    console.error('Не удалось добавить товар:', error.message);
    process.exitCode = 1;
  }
}

const product = process.argv[2] || 'Монитор';
const quantity = process.argv[3] || '10';

addProduct(product, quantity);
