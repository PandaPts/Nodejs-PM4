const fs = require('node:fs/promises');
const path = require('node:path');

async function issueBook(id) {
  const booksPath = path.join(__dirname, '..', 'books.json');

  try {
    const content = await fs.readFile(booksPath, 'utf8');
    const books = JSON.parse(content);

    if (!Array.isArray(books)) {
      throw new Error('books.json должен содержать массив книг.');
    }

    const book = books.find((item) => item.id === id);

    if (!book) {
      console.error(`Книга с id ${id} не найдена.`);
      process.exitCode = 1;
      return;
    }

    book.isIssued = true;
    await fs.writeFile(booksPath, `${JSON.stringify(books, null, 2)}\n`, 'utf8');
    console.log(`Книга "${book.title}" выдана.`);
  } catch (error) {
    console.error('Не удалось обновить статус книги:', error.message);
    process.exitCode = 1;
  }
}

async function main() {
  const id = Number(process.argv[2]);

  if (!Number.isInteger(id) || id < 1) {
    console.error('Укажите корректный id книги. Пример: node index.js 1');
    process.exitCode = 1;
    return;
  }

  await issueBook(id);
}

main();
