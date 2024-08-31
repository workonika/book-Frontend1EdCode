let globalVar = 'Современная фронтенд-разработка';

const fnSideEffect1 = (sentence) => {
    return globalVar += sentence;
};

const fnSideEffect2 = () => Date.now();

const fnSideEffect3 = (sentence) => {
    const stringified = JSON.stringify(sentence);

    localStorage.setItem('example', stringified);
};

console.log(globalVar);
fnSideEffect1(' с библиотеками');
console.log(globalVar);

console.log(fnSideEffect2());

fnSideEffect3('Сохраним в локал сторэдж');

console.log(fnSideEffect2());
console.log(localStorage.getItem('example'));