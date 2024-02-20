var express = require('express');
var router = express.Router();
const { pedirComentarios, crearComentario, pedirRespuestas, pedirNumeroDeComentarios } = require('../entradasDB/comentariosDB');


router.get('/:clave', function(req, res, next) {
    const clave = req.params['clave']
    pedirComentarios('comentarios', clave, (error, data) =>{
        if(error){
        return next(error)
        }
        return res.send(data)
    })
});

router.get('/respuestas/:clave', function(req, res, next) {
    const clave = req.params['clave']
    pedirRespuestas('comentarios', clave, (error, data) =>{
        if(error){
        return next(error)
        }
        return res.send(data)
    })
});

router.post('/comentario', function(req, res, next) {
    const comentario = req.body
    crearComentario('comentarios', comentario, (error,data) => {
    if(error){
        return next(error)
    }
    return res.send(data)
    })
});

router.get('/numero/:clave', function(req, res, next) {
    const clave = req.params['clave']
    pedirNumeroDeComentarios('comentarios', clave, (error, data) =>{
        if(error){
        return next(error)
        }
        return res.send(data)
    })
});


module.exports = router;
