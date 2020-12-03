let clock = document.getElementById('clock'),
    color = document.getElementById('color');

let colorWatch = () => {
    let time = new Date(),
        hours = (time.getHours() % 12).toString(),
        minutes = time.getMinutes().toString(),
        seconds = time.getSeconds().toString();


    if (hours < 10) hours = `0${hours}`;
    if (minutes < 10) minutes = `0${minutes}`;
    if (seconds < 10) seconds = `0${seconds}`;

    let clockString = `${hours}:${minutes}:${seconds}`,
        colorString = `#${hours}${minutes}${seconds}`;

    clock.textContent = clockString;
    color.textContent = colorString;
    document.body.style.background = colorString;
}

colorWatch();
setInterval(colorWatch, 1000);