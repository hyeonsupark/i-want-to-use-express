
function ttc() {

    var date = new Date();
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

function change(hours, minutes, seconds) {
    
    var color = '#' + hours + minutes + seconds;
    var time = hours + ' : ' + minutes + ' : ' + seconds;
    
    document.body.style.backgroundColor = color;
    document.getElementById("color").innerHTML = color;
    document.getElementById("time").innerHTML = time; 
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
