'use strict';

const request = require('request');
const Jenkins = require("../util/Jenkins");
const config = require("../../storage/config");

module.exports.get_plugin_artifact = function(req, res) {
    const jenkins = new Jenkins(config.jenkins);

    const name = req.params.plugin;
    if (name !== "core" && name !== "db")
        return false;

    const jenkinsJob = (name === "core") ? "UtariaCore-dev" : "UtariaDatabase-production";
    const mavenModule = (name === "core") ? "fr.utaria$utariacore" : "fr.utaria$utariadatabase";
    const filename = (name === "core") ? "UtariaCore.jar" : "UtariaDatabase.jar";

    jenkins.getLastArtifactPathOf(jenkinsJob, mavenModule, function(err, link) {
        if (err) {
            res.status(502).json({
                error: "Jenkins error!",
                message: err
            });
            return false;
        }

        res.setHeader("content-type", "application/java-archive");
        res.setHeader("content-disposition", "attachment; filename=" + filename);
        req.pipe(request(link)).pipe(res);
    });
};

module.exports.get_database_with_ip = function(req, res) {
    const ip = req.params.ip;

    // TODO support production servers
    res.json({
        success: true,
        db_url: "utaria.db"
    });
};