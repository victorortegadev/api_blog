var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  return res.send('index');
});

router.get('/nuevo', function(req, res, next) {
  res.send({
    "titulo" : "ruta indice"   
  });
});

module.exports = router;
