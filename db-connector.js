// import mysql from "mysql"

const mysql = require('mysql');

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_smitcha6',
    password        : '7055',
    database        : 'cs340_smitcha6'
})

// Export it for use in our application
module.exports.pool = pool;