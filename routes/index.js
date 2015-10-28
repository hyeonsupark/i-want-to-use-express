var express = require('express');
var http = require('http').Server(express);
var io = require( "socket.io" )(http);

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index');
});

router.get('/react', function(req, res) {
	res.render('react');
});

router.post('/comments', function(req, res) {
	var data = [
		{id: 1, author: "Pete Hunt", text: "댓글입니다"},
		{id: 2, author: "Jordan Walke", text: "*또 다른*zzzzz"}
	];
	res.json(data, 200);	
});
module.exports = router;
