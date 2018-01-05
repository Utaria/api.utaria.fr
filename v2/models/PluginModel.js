const db = require("../../db");

const Plugin = {

    getPluginsForIP(ip, callback) {
        return db.query("select `key`, `from`, name from plugins order by priority asc", function(err, data) {
            if (err || !data || data.length === 0) {
                callback(err, null);
            } else {
                let plugins = {};

                for (const plugin of data)
                    if (String(ip).match(plugin.from))
                        plugins[plugin.key] = plugin.name;

                callback(null, plugins);
            }
        });
    },

    getPluginByKeyAndIP(key, ip, callback) {
        return db.query("select * from plugins where `key` = ? order by priority asc", [key], function(err, data) {
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