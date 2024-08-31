const ul = document.querySelector('ul');
const li = ul.firstElementChild;

ul.addEventListener("click", function(event) {
    console.log('Произошло событие на элементе UL');
});

li.addEventListener("click", function(event) {
    event.stopImmediatePropagation();
    console.log('Обработчик 1 на элементе LI');
});

li.addEventListener("click", function(event) {
    event.stopImmediatePropagation();
    console.log('Обработчик 2 на элементе LI');
});
