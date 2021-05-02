const body = document.querySelector("body");

const IMG_NUMBER = 3;

function imagPaint(imgNumber) {
    const image = new Image();
    image.src = `image/${imgNumber + 1}.jpg`;
    image.classList.add("bgImage");
    body.appendChild(image);
}

function genNumber() {
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init() {
    const randomNumber = genNumber();
    imagPaint(randomNumber);
}

init();