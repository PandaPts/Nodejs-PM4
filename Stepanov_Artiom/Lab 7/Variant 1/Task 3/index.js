const fs = require('node:fs');
const path = require('node:path');

const filePath = path.join(__dirname, '..', 'Task 1', 'input.txt');
const searchWord = process.argv[2] || 'streams';
const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });
let carry = '';
let offset = 0;
let matchFound = false;
let pausedForMatch = false;
let streamEnded = false;
let pauseTimer;

function finishSearch() {
  console.log('Поиск завершён.');
}

readStream.on('data', (chunk) => {
  const text = carry + chunk;
  const matchIndex = text.indexOf(searchWord);

  if (matchIndex !== -1 && !matchFound) {
    const fileIndex = offset - carry.length + matchIndex;
    matchFound = true;
    pausedForMatch = true;
    console.log(`Слово "${searchWord}" найдено по индексу ${fileIndex}.`);
    readStream.pause();
    pauseTimer = setTimeout(() => {
      pausedForMatch = false;
      readStream.resume();
      if (streamEnded) {
        finishSearch();
      }
    }, 3000);
  }

  offset += chunk.length;
  carry = text.slice(Math.max(0, text.length - searchWord.length + 1));
});

readStream.on('end', () => {
  streamEnded = true;
  if (!pausedForMatch) {
    finishSearch();
  }
});

readStream.on('error', (error) => {
  console.error('Ошибка чтения файла:', error.message);
  process.exitCode = 1;
});

readStream.on('close', () => {
  if (pauseTimer) {
    clearTimeout(pauseTimer);
  }
});
