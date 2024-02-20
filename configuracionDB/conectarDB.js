const initOptions = {}
const pgp = require('pg-promise')(initOptions)

require('dotenv').config()

/*const cn = {
    user: process.env.DEBUG_USER,
    password: process.env.DEBUG_PASSWORD,
    host:'localhost',
    port: 5432,
    database: 'blogDB'
}*/

//const db = pgp(cn)

//const db = pgp(process.env.DATABASE_URL)

const cn = {
    connectionString: process.env.DATABASE_URL ,
    ssl:true,
    extra:{ssl: {rejectUnauthorized: false}}
};

const db = pgp(cn)

module.exports = db;