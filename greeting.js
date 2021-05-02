const form = document.querySelector(".form-js"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".greeting-js");

const USER_LIST = "currentUser",
    SHOWING = "showing";

function saveName(text) {
    localStorage.setItem(USER_LIST, text);
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    form.classList.add(SHOWING);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
    form.classList.remove(SHOWING);
    greeting.classList.add(SHOWING);
    greeting.innerText = `반가워요 ${text}님 !`;
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LIST);
    if (currentUser === null) {
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}

function init(){
    loadName();
}

init();