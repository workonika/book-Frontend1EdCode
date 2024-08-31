const workers = {
    man: [{ name: 'Александр', age: 32 }, { name: 'Фёдор', age: 36 }, { name: 'Валентин', age: 31 }],
    woman: [{ name: 'Анжела', age: 28 }, { name: 'Ирина', age: 32 }],
};

const enhanceArray = (array, prop) => array.map(item => ({...item, ...prop}));
const man = enhanceArray(workers.man, { sex: 'man' });
const woman = enhanceArray(workers.man, { sex: 'woman' });
const enhancedWorkers = [...man, ...woman];
