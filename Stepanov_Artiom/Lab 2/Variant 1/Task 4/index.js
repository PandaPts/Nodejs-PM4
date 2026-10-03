const { isPositive, isEven } = require('./validator');

for (const number of [-3, 0, 4, 7]) {
  console.log(
    `${number}: положительное — ${isPositive(number)}, чётное — ${isEven(number)}`,
  );
}
