const fs = require('node:fs/promises');
const path = require('node:path');

async function checkFiles() {
  const fileNames = [
    'Task 5/index.js',
    'Task 2/tasks.txt',
    'Task 4/source.txt',
    'Task 5/missing.txt',
  ];

  try {
    const results = await Promise.all(
      fileNames.map(async (fileName) => {
        const filePath = path.join(__dirname, '..', fileName);

        try {
          await fs.access(filePath);
          return { fileName, exists: true };
        } catch (error) {
          if (error.code === 'ENOENT') {
            return { fileName, exists: false };
          }

          throw error;
        }
      }),
    );

    for (const result of results) {
      const status = result.exists ? 'существует' : 'не найден';
      console.log(`${result.fileName}: ${status}`);
    }
  } catch (error) {
    console.error('Не удалось проверить файлы:', error.message);
    process.exitCode = 1;
  }
}

async function main() {
  await checkFiles();
}

main();
