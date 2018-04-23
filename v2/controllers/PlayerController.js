'use strict';

const Model  = require("../models/PlayerModel");

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

module.exports.ignauth = function(req, res) {
    Model.authenticateIGN(req.query.ign, function(err, user) {
        if (err || !user) {
            res.status(400).json({
                verified: "false",
                error: "Nous ne trouvons pas votre pseudo. Avez-vous joué sur UTARIA ?"
            });
            return false;
        }

        res.status(200).json({
            verified: true,
            message: "Bonjour, vous êtes maintenant connecté !"
        });
    });
};