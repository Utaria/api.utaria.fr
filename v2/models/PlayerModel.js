const mysql = require("mysql");
const config = require("../../storage/config");

config.mysql.database = "global";
const db = mysql.createPool(config.mysql);

const PlayerModel = {

    authenticate: function (name, password, callback) {
        return db.query("select * from global.players where playername = ? AND password = ?", [name, password], function(err, data) {
            if (err || !data || data.length === 0) {
                callback(err, null);
            } else {
                callback(null, data[0]);
            }
        });
    },

    authenticateIGN: function (name, callback) {
        return db.query("select * from global.players where playername = ?", [name], function(err, data) {
            if (err || !data || data.length === 0) {
                callback(err, null);
            } else {
                callback(null, data[0]);
            }
        });
    }

};

module.exports = PlayerModel;