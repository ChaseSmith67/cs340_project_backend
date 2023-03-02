import mysql from "mysql"

// Create a 'connection pool' using the provided credentials
var db = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_smitcha6',
    password        : '7055',
    database        : 'cs340_smitcha6'
})

// Export it for use in our application
export default db;