const db = require('../configuracionDB/conectarDB')


function pedirEntradas (tabla,callback) {
    db.any(`SELECT * FROM ${tabla} ORDER BY id desc`)
        .then(data => {
            callback(null, data)
        })
        .catch(error => {
            callback(error)
        })
}


function pedirEntrada (tabla,id,callback) {
    db.any(`SELECT * FROM ${tabla} WHERE id = ${id} `)
        .then(([data]) => {
            callback(null, data)
        })
        .catch(error => {
            callback(error)
        })
}

function crearEntrada (tabla, entrada, callback) {
    const llaves = Object.keys(entrada)
    const nombre_columna = llaves.join()
    const valores = llaves.map((llave) => { 
        if(entrada[llave] != ''){return `'${entrada[llave]}'`}else{return 'null'}
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

function actualizarEntrada (tabla, entrada,callback) {
    const llaves = Object.keys(entrada)
    const claves_valores = llaves.map((llave) => {return `${llave}=${entrada[llave] != null 
        ? `'${entrada[llave]}'`: null}`}).join()

    console.log(` update ${tabla} set ${claves_valores} where id = ${entrada.id} RETURNING * ;`)
    
    db.any(` update ${tabla} set ${claves_valores} where id = ${entrada.id} RETURNING * ;`)
        .then(([data]) => {
            callback(null, data)
        })
        .catch(error => {
            callback(error)
        })
}

function borrarEntrada (tabla,id,callback) {

    db.any(`delete from ${tabla} where id=${id};`)
        .then(([data]) => {
            callback(null, data)
        })
        .catch(error => {
            callback(error)
        })
}

function buscarEntradas (tabla, claveBusqueda, callback) {

    let claveBusquedaLimpiado = claveBusqueda.replaceAll(",", " ").replaceAll(".", " ").replaceAll('|', ' ').replaceAll('\n', ' ').replaceAll('\t', ' ').replaceAll('\\', ' ').replaceAll('\r', ' ').replaceAll('\v', '').replaceAll('\'', ' ').replaceAll('\"', ' ')
    let claveArr = claveBusquedaLimpiado.split(" ").filter(chr => chr !== "");

    let comando =  claveArr.map(clave => {return claveArr.length > 1? `${clave == claveArr[0]? '' : 'AND'} textoplano like '% ${clave} %'` :  `textoplano LIKE '% ${clave} %'`}).join().replaceAll(",", " ")
    
   db.multi(`SELECT * FROM ${tabla} WHERE ${comando};`)
        .then(([data]) => {
            callback(null, data)
        })
        .catch(error => {
            callback(error)
        })
}

module.exports = {pedirEntradas, pedirEntrada, crearEntrada, actualizarEntrada, borrarEntrada, buscarEntradas}