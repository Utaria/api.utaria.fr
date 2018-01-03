'use strict';

const request = require('request');
const Jenkins = require("../util/Jenkins");
const config  = require("../../storage/config");
const Model   = require("../models/PluginModel");

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

module.exports.get_database_server = function(req, res) {
    const name = req.params.name;
    const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress).split(",")[0];

    Model.getDatabaseByName(name, function(err, data) {
        if (err || !data || data.length === 0) {
            res.status(404).json({
                error: "No database found!",
                message: "The database with the name " + name + " doesn't exist!"
            });
        } else {
            for (let i = 0; i < data.length; i++) {
                const database = data[i];

                if (ip.match(database.from)) {
                    res.json({
                        success: true,
                        name: name,
                        from: ip,
                        server: database.server
                    });

                    return false;
                }
            }

            res.status(404).json({
                error: "No database found!",
                message: "No database accessible from your IP address!"
            });
        }
    });
};