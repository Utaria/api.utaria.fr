const db = require("../../db");

const Player = {

    getAllPlayers: function (callback) {
        return db.query("select * from players", callback);
    }

};

module.exports = Player;