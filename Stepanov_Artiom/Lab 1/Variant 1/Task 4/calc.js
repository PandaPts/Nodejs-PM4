const first = Number(process.argv[2]);
const second = Number(process.argv[3]);

if (!Number.isFinite(first) || !Number.isFinite(second)) {
  console.error('Укажите два числа. Пример: node calc.js 5 3');
  process.exitCode = 1;
} else {
  console.log(`${first} + ${second} = ${first + second}`);
}
