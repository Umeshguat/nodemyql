'use strict';

const mysql = require('mysql');
const util = require('util');
const mysql_connection = require('../config').mysql;
//let connection = undefined;

/*-
//- Create the connection variable
//-*/
mysql_connection.connectionLimit = 10;
var connection = mysql.createPool(mysql_connection);

connection.getConnection(function (err) {
    if (err) {
        // mysqlErrorHandling(connection, err);
        console.log("\n\t *** Cannot establish a connection with the database. ***");
        connection = reconnect(connection);
    } else {
        console.log('Connected to db');
        connection.query = util.promisify(connection.query);
        console.log("\n\t *** New connection established with the database. ***")
    }
});


/*-//-
//- Reconnection function
//- */
function reconnect(connection) {
    console.log("\n New connection tentative...");
    connection = mysql.createPool(mysql_connection);

    //- Try to reconnect
    connection.getConnection(function (err) {
        if (err) {
            //- Try to connect every 2 seconds.
            setTimeout(function () {
                reconnect(connection);
            }, 2000);
        } else {
            connection.query = util.promisify(connection.query);
            console.log("\n\t *** Re- connection established with the database. ***");
            return connection;
        }
    });
}

/*
//-
//- Error listener
//- */
connection.on('error', function (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
        console.log("/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
        return reconnect(connection);
    }

    else if (err.code === "PROTOCOL_ENQUEUE_AFTER_QUIT") {
        console.log("/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
        return reconnect(connection);
    }

    else if (err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR") {
        console.log("/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
        return reconnect(connection);
    }

    else if (err.code === "PROTOCOL_ENQUEUE_HANDSHAKE_TWICE") {
        console.log("/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
    }

    else {
        console.log("/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
        return reconnect(connection);
    }

});

module.exports.connection = connection;
