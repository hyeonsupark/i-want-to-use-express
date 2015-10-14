var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/asdf', function(req, res, next) {
  res.send('users/asdf');
});

module.exports = router;
