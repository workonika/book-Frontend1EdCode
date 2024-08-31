const [div, ul] = ['div', 'ul'].map(element => document.querySelector(element));
const li = document.createElement('li');
const text = document.createTextNode('Туры по 64000 руб.');
li.appendChild(text);

ul.appendChild(li);
div.textContent = '+7 495 000-00-00';