const ul = document.querySelector('ul');
const li = ul.firstElementChild;

ul.addEventListener("click", function(event) {
    console.log('Произошло событие на элементе UL');
});

li.addEventListener("click", function(event) {
    event.stopPropagation();
    console.log('Произошло событие на элементе LI');
});

// => Произошло событие на элементе LI