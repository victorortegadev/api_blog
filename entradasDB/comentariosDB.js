const db = require('../configuracionDB/conectarDB')


function pedirComentarios (tabla, clave, callback) {
    db.any(`SELECT * FROM ${tabla} where clave_entrada = ${clave} and clave_respuesta is null`)
        .then(data => {
            callback(null, data)
        })
        .catch(error => {
            callback(error)
        })
}
function pedirRespuestas (tabla, clave, callback) {
    db.any(`SELECT * FROM ${tabla} where clave_respuesta = ${clave}`)
        .then(data => {
            callback(null, data)
        })
        .catch(error => {
            callback(error)
        })
}

function crearComentario (tabla, comentario, callback) {
    const llaves = Object.keys(comentario)
    const nombre_columna = llaves.join()
    const valores = llaves.map((llave) => { 
        if(comentario[llave] != ''){return `'${comentario[llave]}'`}else{return 'null'}
    }).join()

    db.any(`INSERT INTO ${tabla} (${nombre_columna}) 
            VALUES (${valores}) RETURNING * ;`)
        .then(([data]) => {
            callback(null, data)
        })
        .catch(error => {
            callback(error)
        })
}
function pedirNumeroDeComentarios (tabla, clave, callback) {
    db.any(`select count(*) FROM ${tabla} where clave_entrada = ${clave} `)
        .then(data => {
            callback(null, data)
        })
        .catch(error => {
            callback(error)
        })
}

module.exports = {pedirComentarios, crearComentario, pedirRespuestas, pedirNumeroDeComentarios}