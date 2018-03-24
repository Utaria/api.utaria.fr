const db = require("../../db");

const Plugin = {

    getPluginsForIP(ip, callback) {
        return db.query("select `key`, `from`, `default`, name from plugins", function(err, data) {
            if (err || !data || data.length === 0) {
                callback(err, null);
            } else {
                let plugins = {};
                let defPlugins = [];

                for (const plugin of data)
                    if (String(ip).match(plugin.from))
                        plugins[plugin.key] = plugin.name;

                for (const plugin of data)
                    if (plugin.default && defPlugins.indexOf(plugin.key) === -1)
                        defPlugins.push(plugin.key);

                callback(null, plugins, defPlugins);
            }
        });
    },

    getPluginByKeyAndIP(key, ip, callback) {
        return db.query("select * from plugins where `key` = ?", [key], function(err, data) {
            if (err || !data || data.length === 0) {
                callback(err, null);
            } else {
                let retPlug = null;

                for (const plugin of data) {
                    if (String(ip).match(plugin.from)) {
                        if (plugin.environment === 'no') {
                            callback(null, null);
                            return;
                        }

                        retPlug = plugin;
                    }
                }

                callback(null, retPlug);
            }
        });
    },

    getDatabaseByName: function (name, callback) {
        return db.query("select name, `from`, server from `databases` where name = ?", [name], callback);
    }

};

module.exports = Plugin;