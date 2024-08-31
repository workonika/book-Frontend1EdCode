document.addEventListener("keydown", function(event) {
    var key = event.key;
    console.log("Нажата клавиша " + key);
});

document.addEventListener("keyup", function(event) {
    var key = event.key;
    console.log("Отпущена клавиша " + key);
});