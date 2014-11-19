var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
/* GET home page. */
router.get('/ejemplo/1', function(req, res) {
  res.render('ejemplo-1', { title: 'Express' });
});
/* GET home page. */
router.get('/ejemplo/2', function(req, res) {
  res.render('ejemplo-2', { title: 'Express' });
});
/* GET home page. */
router.get('/ejemplo/3', function(req, res) {
  res.render('ejemplo-3', { title: 'Express' });
});

module.exports = router;
