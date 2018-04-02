
function ttc() {
    setInterval(function() {

        var date = new Date();

        then = new Date(2020, 11 - 1, 11, 0, 0, 0, 0);
        then_next = new Date(2021, 1 - 1, 1, 0, 0, 0, 0);

        var dms = then.getTime() - date.getTime();
        if (dms < 0) {
            dms = then_next.getTime() - date.getTime();
        }

        var res = calc(dms);        
        change(res.hour, res.minute, res.second, res.text);
    }, 1000);

}

function currentTimer(date) {
    var hours = getHours(date);
    var minutes = getMinutes(date);
    var seconds = getSeconds(date);
    change(hours, minutes, seconds);

    setInterval(function() {
        var date = new Date();
        var hours = getHours(date);
        var minutes = getMinutes(date);
        var seconds = getSeconds(date);
        change(hours, minutes, seconds);

    }, 1000);
}

function change(hours, minutes, seconds, text) {

    var color = '#' + hours + minutes + seconds;
    var time = hours + ' : ' + minutes + ' : ' + seconds;

    document.body.style.backgroundColor = color;
    document.getElementById("color").innerHTML = color;
    document.getElementById("time").innerHTML = text; 
}


function getHours(date) {
    var hours = date.getHours();

    return hours < 10 ? '0' + hours : hours;
}

function getMinutes(date) {
    var minutes = date.getMinutes();

    return minutes < 10 ? '0' + minutes : minutes;
}

function getSeconds(date) {
    var seconds = date.getSeconds();

    return seconds < 10 ? '0' + seconds : seconds;
}

function format(integer) {
    return integer < 10 ? '0' + integer : integer;
}



function calc(dms) {
    var ms = dms;
    var sec = ms / 1000;    ms %= 1000;
    var min = sec / 60;             sec %= 60;
    var hr = min / 60;              min %= 60;
    var day = hr / 24;              hr %= 24;
    sec = format(Math.floor(sec));
    min = format(Math.floor(min));
    hr = format(Math.floor(hr));
    day = Math.floor(day);

    var res = day + "days " + hr + ":" + min + ":" + sec;
    return {hour: hr, minute: min, second: sec, 'text': res};
}


