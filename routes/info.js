var express = require('express');
var http = require('http').Server(express);

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('info');
});

module.exports = router;
