var express = require('express');
var http = require('http').Server(express);

var router = express.Router();

router.get('/', function(req, res) {
    var date = new Date();

    var hours = getHours(date);
    var minutes = getMinutes(date);
    var seconds = getSeconds(date);

    var color = `${hours}${minutes}${seconds}`;
    var time = hours + ':' + minutes + ':' + seconds;
    var image = `http://dummyimage.com/600x315/${color}/fff.png?text=${time}`;

    var data = {
        color: color,
        time: time,
        image: image
    };

    res.render('time', data);
});

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

module.exports = router;
