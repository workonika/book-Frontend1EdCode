const ul = document.querySelector('ul');
const li = ul.firstElementChild;

li.addEventListener("click", function(event) {
    console.log(event.target === li);
    console.log('event.target: ', event.target);
});
