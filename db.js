const mysql = require("mysql");
const config = require("./storage/config");

const connection = mysql.createPool(config.mysql);

module.exports = connection;