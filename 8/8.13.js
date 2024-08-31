const titleAttr = document.createAttribute('title');
titleAttr.value = 'Это список всех типов туров, имеющихся на сегодня';
const ul = document.querySelector('ul');
ul.setAttributeNode(titleAttr);
