'use strict';

const ApiUserModel = require("../models/ApiUserModel");
const jwt          = require("jsonwebtoken");
const config       = require("../../storage/config");
const bcrypt       = require('bcrypt');

module.exports.home_version = function(req, res) {
    res.json({
        message: "Welcome to Utaria's API v2!",
        latest: true,
        awesome: true
    });
};

module.exports.authenticate = function(req, res) {
    // find the user
    ApiUserModel.findByName(req.body.name, function(err, user) {
        if (err) throw err;

        if (!user) {
            res.json({success: false, message: 'Authentication failed. User not found.'});
        } else if (user) {
            // check if password matches
            bcrypt.compare(req.body.password, user.password, function(cryptErr, cryptRes) {
                if(cryptRes) {
                    // if user is found and password is right
                    // create a token with only our given payload
                    // we don't want to pass in the entire user since that has the password
                    const payload = { admin: user.admin };
                    const token = jwt.sign(payload, config.secretToken, { expiresIn: 60 });

                    // return the information including token as JSON
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
                } else {
                    res.json({success: false, message: 'Authentication failed. Wrong password.'});
                }
            });
        }
    });
};