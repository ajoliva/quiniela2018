/**
 * Module that handles the database connection.
 * Creates the connection object and also tests the connection when imported.
 */
const mysql = require("mysql");
const config = require("../../config.json");

var connection = mysql.createConnection({
    host     : config.db.HOST,
    user     : config.db.USER,
    password : config.db.PASSWORD,
    database : config.db.DATABASE
});

//Testing the db connection at startup
connection.connect(function(err){
    if(!err) {
        console.log("Database is connected");
    } else {
        console.log("Error while connecting with database", err);
    }
});

module.exports = connection;
