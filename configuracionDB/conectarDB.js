const initOptions = {}
const pgp = require('pg-promise')(initOptions)

require('dotenv').config()

const cn = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    ssl:true,
    extra:{ssl: {rejectUnauthorized: false}}
}

const db = pgp(cn)

//const db = pgp(process.env.DATABASE_URL)

/*const cn = {
    connectionString: process.env.DATABASE_URL ,
    ssl:true,
    extra:{ssl: {rejectUnauthorized: false}}
};

const db = pgp(cn)*/

module.exports = db;