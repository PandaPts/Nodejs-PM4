const fs = require('node:fs/promises');
const path = require('node:path');

async function copyAndRemoveSource() {
  const sourcePath = path.join(__dirname, 'source.txt');
  const copyPath = path.join(__dirname, 'copy.txt');

  try {
    await fs.copyFile(sourcePath, copyPath);
    await fs.unlink(sourcePath);
    console.log('Файл скопирован в copy.txt, исходный файл удалён.');
  } catch (error) {
    console.error('Не удалось скопировать или удалить файл:', error.message);
    process.exitCode = 1;
  }
}

async function main() {
  await copyAndRemoveSource();
}

main();
