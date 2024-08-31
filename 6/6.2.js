const h1 = document.createElement('h1');
const body = document.body;
const text = document.createTextNode('Привет Фронтенд-разработчик!');

h1.appendChild(text);
body.innerHTML = '';
body.appendChild(h1);
