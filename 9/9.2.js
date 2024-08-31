const ul = document.querySelector('ul');
const li = ul.firstElementChild;

const clickHandler = (eventObject) => {
    console.log(eventObject);
    alert(eventObject.target.textContent);
};

li.addEventListener('click', clickHandler, true);