const fs = require('node:fs/promises');
const path = require('node:path');

async function deleteOldBooks(currentYear) {
  const booksPath = path.join(__dirname, '..', 'books.json');

  try {
    const content = await fs.readFile(booksPath, 'utf8');
    const books = JSON.parse(content);

    if (!Array.isArray(books)) {
      throw new Error('books.json должен содержать массив книг.');
    }

    const remainingBooks = books.filter(
      (book) => currentYear - book.year <= 50,
    );
    const deletedCount = books.length - remainingBooks.length;

    await fs.writeFile(
      booksPath,
      `${JSON.stringify(remainingBooks, null, 2)}\n`,
      'utf8',
    );
    console.log(`Удалено книг старше 50 лет: ${deletedCount}.`);
  } catch (error) {
    console.error('Не удалось удалить старые книги:', error.message);
    process.exitCode = 1;
  }
}

async function main() {
  const year = Number(process.argv[2] || new Date().getFullYear());

  if (!Number.isInteger(year) || year < 0) {
    console.error('Укажите корректный текущий год.');
    process.exitCode = 1;
    return;
  }

  await deleteOldBooks(year);
}

main();
