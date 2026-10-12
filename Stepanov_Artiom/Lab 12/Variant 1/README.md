# Лабораторная работа 12 — Вариант 1

## Где выполнены задания

1. `/` отдаёт `public/index.html`; таблица стилей находится в `public/style.css`.
2. Сервер в `server.js` использует таблицу MIME-типов и для неизвестных расширений задаёт `application/octet-stream`. Файл `public/unlisted.dat` оставлен для проверки.
3. Галерея из трёх SVG-изображений находится в `public/images`; сервер отдаёт файлы через `fs.createReadStream().pipe(res)`.
4. MP3-плеер и потоковая передача `public/audio-preview.mp3` настроены в HTML и сервере.
5. `server.js` выводит путь и размер каждого запрошенного файла с помощью `fs.statSync`.

## Запуск

Из этой папки выполните:

```sh
node server.js
```

Затем откройте `http://localhost:3000`.

Проверка через cURL:

```sh
curl -i http://localhost:3000/
curl -i http://localhost:3000/images/mountain.svg
curl -i http://localhost:3000/audio-preview.mp3
curl -i http://localhost:3000/unlisted.dat
curl -i http://localhost:3000/missing.jpg
```

Аудио-превью — образец CC0 из MDN: [t-rex-roar.mp3](https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3).
