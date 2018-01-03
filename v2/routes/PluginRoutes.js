'use strict';
module.exports = function(router) {
    const plugin = require('../controllers/PluginController');

    // Auth
    router.use(require("../util/Authentication"));

    router.route('/plugins/:plugin').get(plugin.get_plugin_artifact);
    router.route('/databases/:ip').get(plugin.get_database_with_ip);
};
