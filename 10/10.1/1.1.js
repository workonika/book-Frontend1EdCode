const getData = (url, cb) => {
    const xhr = new XMLHttpRequest();
    //  Ключевым моментом в том, что запрос производится синхронно, 
    //  является третий параметр метода open. 
    //  Если его опустить, то запрос, по-умолчанию будет асинхронным
    xhr.open('GET', url, false);
    xhr.addEventListener('load', (data) => {
        if (xhr.status === 200) {
            cb && cb(xhr.responseText);
        } else {
            console.error('Ошибка:', xhr.status);
        }
    });
    xhr.send();
};