'use strict';

const config  = require("../../storage/config");
const Model   = require("../models/PlayerModel");

module.exports.authenticate = function(req, res) {
    Model.authenticate(req.body.name, req.body.password, function(err, user) {
        if (err || !user) {
            res.status(400).json({
                error: "No user with these credentials!",
                message: "We cannot retrieve player's informations with given credentials."
            });
            return false;
        }

        res.json({
            id: user.id,
            playername: user.playername,
            uuid: user.uuid
        });
    });
};