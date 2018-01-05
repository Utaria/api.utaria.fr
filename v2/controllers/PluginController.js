'use strict';

const request = require('request');
const Jenkins = require("../util/Jenkins");
const config  = require("../../storage/config");
const Model   = require("../models/PluginModel");

module.exports.get_plugin_list = function(req, res) {
    const ip = getIP(req);

    Model.getPluginsForIP(ip, function(err, plugins) {
        if (err || plugins.length === 0) {
            res.status(404).json({
                error: "No plugin!",
                message: "No plugin was found where you want to load it!"
            });
            return false;
        }

        res.json(plugins);
    });
};

module.exports.get_plugin_artifact = function(req, res) {
    const jenkins = new Jenkins(config.jenkins);
    const key = req.params.plugin;
    const ip = getIP(req);

    Model.getPluginByKeyAndIP(key, ip, function(err, plugin) {
        if (err || plugin == null) {
            res.status(404).json({
                error: "Unknown plugin!",
                message: "No plugin was found with the key " + key + "!"
            });
            return false;
        }

        const jenkinsJob  = plugin.name + "-" + plugin.environment;
        const mavenModule = "fr.utaria$" + plugin.name.toLowerCase();
        const filename = plugin.name + ".jar";

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
    });
};

module.exports.get_plugin_description = function(req, res) {
    const jenkins = new Jenkins(config.jenkins);

    const key = req.params.plugin;
    const ip = getIP(req);

    Model.getPluginByKeyAndIP(key, ip, function(err, plugin) {
        if (err || plugin == null) {
            res.status(404).json({
                error: "Unknown plugin!",
                message: "No plugin was found with the key " + key + "!"
            });
            return false;
        }

        const jenkinsJob  = plugin.name + "-" + plugin.environment;
        const pluginName = plugin.name.toLowerCase();

        jenkins.getPluginYmlOf(jenkinsJob, pluginName, function (err, data) {
            if (err) {
                res.status(502).json({
                    error: "Jenkins error!",
                    message: err
                });
                return false;
            }

            res.send(data);
        });
    });
};

module.exports.get_database_server = function(req, res) {
    const name = req.params.name;
    const ip = getIP(req);

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

function getIP(req) {
    return (req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress).split(",")[0];
}