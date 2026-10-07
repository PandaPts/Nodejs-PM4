const fs = require('node:fs/promises');
const path = require('node:path');

async function addBook(title, author, year) {
  const booksPath = path.join(__dirname, '..', 'books.json');

  try {
    const content = await fs.readFile(booksPath, 'utf8');
    const books = JSON.parse(content);

    if (!Array.isArray(books)) {
      throw new Error('books.json должен содержать массив книг.');
    }

    const nextId = books.reduce(
      (maximumId, book) => Math.max(maximumId, Number(book.id) || 0),
      0,
    ) + 1;
    const book = {
      id: nextId,
      title,
      author,
      year,
      isIssued: false,
    };

    books.push(book);
    await fs.writeFile(booksPath, `${JSON.stringify(books, null, 2)}\n`, 'utf8');
    console.log('Добавлена книга:', book);
  } catch (error) {
    console.error('Не удалось добавить книгу:', error.message);
    process.exitCode = 1;
  }
}

async function main() {
  const [title, author, yearArgument] = process.argv.slice(2);
  const year = Number(yearArgument);

  if (!title || !author || !Number.isInteger(year) || year < 0) {
    console.error('Укажите название, автора и год. Пример: node index.js "Дюна" "Фрэнк Герберт" 1965');
    process.exitCode = 1;
    return;
  }

  await addBook(title, author, year);
}

main();
