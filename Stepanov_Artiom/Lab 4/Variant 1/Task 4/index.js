const fs = require('node:fs');
const path = require('node:path');

const dataDirectory = path.join(__dirname, '..', 'data');
const categoryPath = path.join(dataDirectory, 'categories.txt');
const supplierPath = path.join(dataDirectory, 'suppliers.txt');

try {
  fs.writeFileSync(categoryPath, '');
  fs.writeFileSync(supplierPath, '');

  const files = fs.readdirSync(dataDirectory);
  console.log(`Количество файлов: ${files.length}`);
  console.log(`Файлы: ${files.join(', ')}`);
} catch (error) {
  console.error('Не удалось подготовить или прочитать список файлов:', error.message);
  process.exitCode = 1;
}
