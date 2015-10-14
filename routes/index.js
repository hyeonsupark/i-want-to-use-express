var express = require('express');
var http = require('http').Server(express);
var io = require( "socket.io" )(http);

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index');
});

module.exports = router;
