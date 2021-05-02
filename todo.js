const todoForm = document.querySelector(".todo-form"),
    todoInput = todoForm.querySelector("input"),
    pendingList = document.querySelector(".pending_list"),
    finishList = document.querySelector(".finish_list");

const PENDING_LIST = "Pending",
    FINISH_LIST = "Finished";

let pending = [],
    finished = [];

function filterFn(toDo) {
    return toDo.id === 1;
}

function finishToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    const text = li.children[0].innerText;
    finishPaint(text);
    pendingList.removeChild(li);
    const cleanToDo = pending.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    });
    pending = cleanToDo;
    saveToDo();
}

function deletePending(event) {
    const btn = event.target;
    const li = btn.parentNode;
    pendingList.removeChild(li);
    const cleanPending = pending.filter(function (toDo){
        return toDo.id !== parseInt(li.id);
    });
    pending = cleanPending;
    saveToDo();
}

function deleteFinish(event) {
    const btn = event.target;
    const li = btn.parentNode;
    finishList.removeChild(li);
    const cleanFinish = finished.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    });
    finished = cleanFinish;
    saveToDo();
}


function finishBack(event) {
    const btn = event.target;
    const li = btn.parentNode;
    const text = li.children[0].innerText;
    pendingPaint(text);
    finishList.removeChild(li);
    const cleanTodo = finished.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    });
    finished = cleanTodo;
    saveToDo();
}

function saveToDo() {
     localStorage.setItem(PENDING_LIST, JSON.stringify(pending));
     localStorage.setItem(FINISH_LIST, JSON.stringify(finished));
}

function pendingPaint(text) {
    const li = document.createElement("li"),
        delBtn = document.createElement("button"),
        finishBtn = document.createElement("button"),
        span = document.createElement("span"),
        newID = pending.length + 1;
        delBtn.innerText = "❌";
        delBtn.addEventListener("click", deletePending);
        finishBtn.innerText = "🆗";
        finishBtn.addEventListener("click", finishToDo);
        span.innerText = text;
        li.appendChild(span);
        li.appendChild(delBtn);
        li.appendChild(finishBtn);
        pendingList.appendChild(li);
        li.id = newID;
        const toDoObj = {
            text: text,
            id: newID
        };
        pending.push(toDoObj);
        saveToDo();
}

function finishPaint(text) {
    const li = document.createElement("li"),
        delBtn = document.createElement("button"),
        backBtn = document.createElement("button"),
        span = document.createElement("span"),
        newID = finished.length + 1;
        delBtn.innerText = "❌";
        delBtn.addEventListener("click", deleteFinish);
        backBtn.innerText = "🔙";
        backBtn.addEventListener("click", finishBack);
        span.innerText = text;
        li.appendChild(span);
        li.appendChild(delBtn);
        li.appendChild(backBtn);
        finishList.appendChild(li);
        li.id = newID;
        const finishObj = {
            text: text,
            id: newID
        };
        finished.push(finishObj);
        saveToDo();
}

function addTask(event) {
    event.preventDefault();
    const currentValue = todoInput.value;
    pendingPaint(currentValue);
    todoInput.value = "";
}

function loadToDo() {
    const pendingLoad = localStorage.getItem(PENDING_LIST),
        finishLoad = localStorage.getItem(FINISH_LIST);

    if (pendingLoad !== null) {
        const parsePending = JSON.parse(pendingLoad);
        parsePending.forEach(function (PendingTodo) {
            pendingPaint(PendingTodo.text);
        });
    }

    if (finishLoad !== null) {
        const parseFinish = JSON.parse(finishLoad);
        parseFinish.forEach(function (FinishTodo) {
            finishPaint(FinishTodo.text);
        });
    }
}

function init() {
    loadToDo();
    todoForm.addEventListener("submit", addTask);
}

init();