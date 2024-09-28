var express = require('express');
var router = express.Router();
const db = require('../configuracionDB/conectarDB')

/* GET home page. */
router.get('/', function(req, res, next) {
  return res.send('index');
});

router.get('/nuevo', function(req, res, next) {
  res.send({
    "titulo" : "ruta indice"   
  });
});
////////////////////////////////////////////

router.get('/marca', function(req, res, next) {
  db.any('SELECT NOW()')
      .then(data => {
        return res.send(data);
      })
      .catch(error => {
        return res.send(error);
      })
});
module.exports = router;
