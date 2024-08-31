//   Синхронное выполнение программы

let isLocked = true;

setTimeout(() => isLocked = true, 10);
let counter = 0;

while(isLocked)
    counter++;
console.log(counter);
