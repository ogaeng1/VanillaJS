const clock = document.querySelector(".clock-js"),
    dateInfo = document.querySelector("h1");
    clockTitle = clock.querySelector("h2");


function getTime(){
    const Info = new Date(),
        year = Info.getFullYear(),
        month = Info.getMonth() + 1,
        date = Info.getDate(),
        hours = Info.getHours(),
        minutes = Info.getMinutes(),
        seconds = Info.getSeconds();

        dateInfo.innerText = `${year} - ${month < 10 ? `0${month}` : month} - ${date < 10 ? `0${date}` : date}`;

        clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
                                minutes < 10 ? `0${minutes}` : minutes}:${
                                seconds < 10 ? `0${seconds}` : seconds}`;
}

function init(){
    getTime();
    setInterval(getTime, 1000);

}

init();