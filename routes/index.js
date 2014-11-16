var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
/* GET home page. */
router.get('/ejemplo/2', function(req, res) {
  res.render('ejemplo-2', { title: 'Express' });
});

module.exports = router;
