const fs = require('node:fs/promises');
const path = require('node:path');

async function setup() {
  const storagePath = path.join(__dirname, 'storage');
  const statusPath = path.join(storagePath, 'status.txt');

  try {
    try {
      await fs.access(storagePath);
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error;
      }

      await fs.mkdir(storagePath, { recursive: true });
    }

    await fs.writeFile(statusPath, 'Система готова', 'utf8');
    console.log('Структура storage готова.');
  } catch (error) {
    console.error('Не удалось подготовить storage:', error.message);
    process.exitCode = 1;
  }
}

async function main() {
  await setup();
}

main();
