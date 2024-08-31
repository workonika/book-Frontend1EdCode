const generateInteger = (min = 0, max = Number.MAX_SAFE_INTEGER) => {
    let generatedNumber = Number.MIN_SAFE_INTEGER; 
    while(generatedNumber < min){
        generatedNumber = Math.floor(Math.random() * max);
    }

    return generatedNumber;
}

/**
 * 
 * @param {*} min 
 * @param {*} max 
 * @param {*} multipleOf Если требуются числа нацело делящиеся на десять, сто или другая степень десяти, то передать степень числа десять. 
 * например, если нужно генерировать числа кратные 100, а таковые 800, 1200, но не 850, 1240, то надо передать 
 * в параметр multipleOf цифру 2, что означает 10 в квадрате, то есть 100. Почему параметр не предусмотрен, как число
 * 10, 100 или 1000 и т.д., потому, чтобы не писать код отслеживающий, что пользователь ф-ии не передал 99 и т.д.
 * @returns 
 */
export const generateMultipleOfInteger = (min = 0, max = Number.MAX_SAFE_INTEGER, multipleOf = 0) => {
    if (min >= max){
        console.warn('Параметр min должен быть меньше параметра max');

        return Number.NaN;
    }

    if (min <= multipleOf){
        console.error('Параметр multipleOf не может превышать параметр min');

        return Number.NaN;
    }

    const randomNum = generateInteger(min, max);
    
    if (multipleOf !== 0){
        const remainder = randomNum % Math.pow(10, multipleOf);

        return randomNum - remainder;
    }
    
    return randomNum;
}