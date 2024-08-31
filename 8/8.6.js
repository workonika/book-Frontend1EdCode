const ul = document.querySelector('ul');
const childToDelete = ul.lastElementChild.previousSibling;
ul.removeChild(childToDelete);