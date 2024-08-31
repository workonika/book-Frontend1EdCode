const ul = document.querySelector('ul');
const li = ul.firstElementChild;

li.addEventListener("mousemove", function(event) {
    var x = event.clientX;
    var y = event.clientY;
    console.log("Координаты курсора мыши: " + x + ", " + y);
});