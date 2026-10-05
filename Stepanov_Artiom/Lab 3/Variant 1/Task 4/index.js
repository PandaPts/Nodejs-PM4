const path = require('node:path');

const files = ['photo.jpg', 'document.pdf', 'music.mp3', 'script.js'];

for (const file of files) {
  const fullPath = path.join(__dirname, 'uploads', file);
  console.log(`${file}: ${path.extname(file)} — ${fullPath}`);
}
