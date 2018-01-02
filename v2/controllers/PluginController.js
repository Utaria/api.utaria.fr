'use strict';

const request = require('request');
const Jenkins = require("../util/Jenkins");
const config = require("../../storage/config");

module.exports.get_db_plugin = function(req, res) {
    const jenkins = new Jenkins(config.jenkins);

    jenkins.getLastArtifactPathOf("UtariaDatabase-production", "fr.utaria$utariadatabase", function(err, link) {
        if (err) {
            res.status(502).json({
                error: "Jenkins error!",
                message: err
            });
            return false;
        }

        res.setHeader("content-type", "application/java-archive");
        res.setHeader("content-disposition", "attachment; filename=UtariaCore.jar");
        req.pipe(request(link)).pipe(res);
    });
};

module.exports.get_core_plugin = function(req, res) {
    const jenkins = new Jenkins(config.jenkins);

    jenkins.getLastArtifactPathOf("UtariaCore-dev", "fr.utaria$utariacore", function(err, link) {
        if (err) {
            res.status(502).json({
                error: "Jenkins error!",
                message: err
            });
            return false;
        }

        res.setHeader("content-type", "application/java-archive");
        res.setHeader("content-disposition", "attachment; filename=UtariaCore.jar");
        req.pipe(request(link)).pipe(res);
    });
};