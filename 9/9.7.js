const inputs = document.querySelectorAll('input');

inputs.forEach((input) => {
    input.addEventListener("focus", function() {
        input.style.backgroundColor = "salmon";
    });

    input.addEventListener("blur", function() {
        input.style.backgroundColor = "palegoldenrod";
    });
});