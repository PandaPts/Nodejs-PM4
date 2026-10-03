let count = 0;

const interval = setInterval(() => {
  count += 1;
  console.log(count);

  if (count === 5) {
    clearInterval(interval);
    process.exit(0);
  }
}, 1000);
