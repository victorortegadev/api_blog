var express = require('express');
var router = express.Router();
const { pedirEntradas, crearEntrada, pedirEntrada, actualizarEntrada, borrarEntrada, buscarEntradas } = require('../entradasDB/entradasDB');


router.get('/entradas', function(req, res, next) {
  pedirEntradas('entradas', (error, data) =>{
    if(error){
      return next(error)
    }
    return res.send(data)
  })
});

router.get('/entrada/:id', function(req, res, next) {
  const id = req.params['id']
  pedirEntrada('entradas',id, (error, data) =>{
    if(error){
      return next(error)
    }
    if(!data){
      return res.send({'inexistente':'si'})
    }
    return res.send(data)
  })
});

router.post('/entrada', function(req, res, next) {
  const entrada = req.body
    crearEntrada('entradas', entrada, (error,data) => {
      if(error){
        return next(error)
      }
      return res.send(data)
    })
});

router.put('/entrada/:id', function(req, res, next) {
  const entrada = req.body
  const id = req.params['id']
  if(entrada.id != id){
    res.status(409).send();
  }
  pedirEntrada('entradas', id, (error, data) =>{
    if(error || !data){
      return next(error)
    }
    actualizarEntrada('entradas', entrada, (error,data) => {
      if(error){
        return next(error)
      }
      return res.send(data)
    })
  })
});

router.delete('/entrada/:id', function(req, res, next) {
  const id = req.params['id']
  
  pedirEntrada('entradas',id, (error, data) =>{
    if(error || !data){
      return next(error)
    }
    borrarEntrada('entradas', id, (error,data) => {
      if(error){
        return next(error)
      }
      return res.send({respuesta:`entrada ${id} borrada`})
    })
  })
});

router.get('/buscarEntradas/:claveBusqueda', function(req, res, next) {
  const claveBusqueda = req.params['claveBusqueda']
  buscarEntradas('entradas' , claveBusqueda , (error, data) =>{
    if(error || !data){
      return next(error)
    }
    return res.send(data)
  })
});
module.exports = router;
