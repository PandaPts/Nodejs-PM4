const fs = require('node:fs/promises');
const path = require('node:path');

async function findBooksByAuthor(author) {
  const booksPath = path.join(__dirname, '..', 'books.json');

  try {
    const content = await fs.readFile(booksPath, 'utf8');
    const books = JSON.parse(content);

    if (!Array.isArray(books)) {
      throw new Error('books.json должен содержать массив книг.');
    }

    const matchingBooks = books.filter(
      (book) => book.author.toLocaleLowerCase() === author.toLocaleLowerCase(),
    );

    if (matchingBooks.length === 0) {
      console.log(`Книги автора "${author}" не найдены.`);
      return;
    }

    console.log(`Книги автора "${author}":`);
    console.log(JSON.stringify(matchingBooks, null, 2));
  } catch (error) {
    console.error('Не удалось найти книги:', error.message);
    process.exitCode = 1;
  }
}

async function main() {
  const author = process.argv.slice(2).join(' ').trim();

  if (!author) {
    console.error('Укажите автора. Пример: node index.js "Фрэнк Герберт"');
    process.exitCode = 1;
    return;
  }

  await findBooksByAuthor(author);
}

main();
