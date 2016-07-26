var express = require('express');
var FCM = require('fcm').FCM;

var http = require('http').Server(express);

var router = express.Router();

var apiKey = 'AIzaSyA4o3ssoBWIL4SSFwQZgvMhoK3wsV_xr6k';
var fcm = new FCM(apiKey);

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

router.get('/sunrin', function(req, res) {
    res.render('sunrin');
});

router.get('/fcm', function(req, res) {

    res.render('fcm');
});

router.post('/fcm', function(req, res) {
    var message = req.body.message;
    var messageData = {
        registration_id: 'dgHHmBtTSM4:APA91bFneY3U5lrQGhPrOgLiKDuk5woqJO6v3QMY-HWjCywLfxIhDAxWhkKl4RuOznCPmExwl784dQbAU_Ll-l5bFZVHQfQUbJG61P06yMSJG-ZB94KR6n5dTwFCC6d1SGC3TC9EUNhi', // required
        collapse_key: 'Collapse key', 
        'data.message': message,
    };

    fcm.send(messageData, function(err, messageId){
        if (err) {
            console.error("Something has gone wrong!", err);
            res.status(400).json({status: 400});
        } else {
            console.log("Sent with message ID: ", messageId);
            res.status(200).json({status: 200});
        }
    });

});

module.exports = router;
