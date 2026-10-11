// Задание 2: nanoid установлен как основная зависимость в package.json.
const { nanoid } = require('nanoid');

// Задание 3: приложение запускается командами npm start и npm run dev.
console.log(`Сгенерированный ID: ${nanoid()}`);
