var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { });
});
/* GET home page. */
router.get('/ejemplo/1', function(req, res) {
  res.render('ejemplo-1', { });
});
/* GET home page. */
router.get('/ejemplo/2', function(req, res) {
  res.render('ejemplo-2', { });
});
/* GET home page. */
router.get('/ejemplo/3', function(req, res) {
  res.render('ejemplo-3',  { dashboard: 'arduino01' });
});

/* GET home page. */
router.get('/dashboard/:id', function(req, res) {
  res.render('ejemplo-3', { dashboard: req.params.id });
});
module.exports = router;
