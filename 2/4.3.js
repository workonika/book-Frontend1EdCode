//  limit - это верхняя граница ограничивающая максимальное
//  псевдослучайное число, которое должно быть сгенерировано
function *generateNumbers(limit){
    while(true){
        yield Math.floor(Math.random() * limit);
    }
}

const generator = generateNumbers(10000);
generator.next();
generator.next();
//  ...
generator.next();
