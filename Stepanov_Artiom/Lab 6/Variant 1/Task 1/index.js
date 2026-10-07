const fs = require('node:fs/promises');
const path = require('node:path');

async function initializeBooks() {
  const booksPath = path.join(__dirname, '..', 'books.json');

  try {
    try {
      await fs.access(booksPath);
      console.log('Файл books.json уже существует.');
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error;
      }

      await fs.writeFile(booksPath, '[]\n', 'utf8');
      console.log('Файл books.json создан с пустым массивом.');
    }
  } catch (error) {
    console.error('Не удалось инициализировать файл books.json:', error.message);
    process.exitCode = 1;
  }
}

async function main() {
  await initializeBooks();
}

main();
