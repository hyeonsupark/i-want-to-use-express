var express = require('express');
var http = require('http').Server(express);

var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('live');
});

module.exports = router;
