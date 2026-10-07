const fs = require('node:fs/promises');
const path = require('node:path');

async function addLog(message) {
  const storagePath = path.join(__dirname, 'storage');
  const logPath = path.join(storagePath, 'activity.log');
  const timestamp = new Date().toLocaleString();

  try {
    await fs.mkdir(storagePath, { recursive: true });
    await fs.appendFile(logPath, `[${timestamp}] ${message}\n`, 'utf8');
    console.log('Запись добавлена в журнал.');
  } catch (error) {
    console.error('Не удалось записать журнал:', error.message);
    process.exitCode = 1;
  }
}

async function main() {
  const message = process.argv.slice(2).join(' ') || 'Событие системы';
  await addLog(message);
}

main();
