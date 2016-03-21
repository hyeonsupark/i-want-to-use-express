var express = require('express');
var http = require('http').Server(express);

var router = express.Router();

var data = [
		{id: 1, author: "jungle", text: "potato is my love"},
		{id: 2, author: "hyeonsu", text: "oh no"}
	];
var id = 2;
/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index');
});

router.get('/react', function(req, res) {
	res.render('react');
});

router.get('/comments', function(req, res) {
	res.status(200).json(data);	
});

router.post('/comments', function(req, res) {
	console.log(req.body);
	id++;
	var author = req.body.author;
	var text = req.body.text;
	data.push({id: id, author: author, text: text});
	res.status(200).json({id: id, author: author, text: text});
});
module.exports = router;
