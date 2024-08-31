const ul = document.querySelector('ul');
const li = ul.firstElementChild;

li.addEventListener('click', (eventObject) => {
    console.log(eventObject);
    alert(eventObject.target.textContent);
}, true);

setTimeout(() => {
    li.removeEventListener('click', (eventObject) => {
        console.log(eventObject);
        alert(eventObject.target.textContent);
    }, true);
}, 20000);