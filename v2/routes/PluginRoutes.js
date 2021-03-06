'use strict';
module.exports = function(router) {
    const plugin = require('../controllers/PluginController');

    // Auth
    router.use(require("../util/Authentication"));

    router.route('/plugins').get(plugin.get_plugin_list);
    router.route('/plugins/:plugin').get(plugin.get_plugin_artifact);
    router.route('/plugindescriptions/:plugin').get(plugin.get_plugin_description);

    router.route('/databases/:name').get(plugin.get_database_server);
};
