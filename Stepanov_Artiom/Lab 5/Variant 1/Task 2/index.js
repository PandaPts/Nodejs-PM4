const fs = require('node:fs/promises');
const path = require('node:path');

async function readTasks() {
  const tasksPath = path.join(__dirname, 'tasks.txt');

  try {
    const tasks = await fs.readFile(tasksPath, 'utf8');
    console.log(tasks.toUpperCase());
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('Файл задач не найден');
      return;
    }

    console.error('Не удалось прочитать файл задач:', error.message);
    process.exitCode = 1;
  }
}

async function main() {
  await readTasks();
}

main();
