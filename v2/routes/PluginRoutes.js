'use strict';
module.exports = function(router) {
    const plugin = require('../controllers/PluginController');

    // Auth
    router.use(require("../util/Authentication"));

    router.route('/plugins/db').get(plugin.get_db_plugin);
    router.route('/plugins/core').get(plugin.get_core_plugin);
};
