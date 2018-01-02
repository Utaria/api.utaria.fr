'use strict';

const PlayerModel = require("../models/PlayerModel");

module.exports.list_all_players = function(req, res) {
    PlayerModel.getAllPlayers(function(err, data) {
        if (err)
            res.send(err);
        else
            res.json(data);
    });
};