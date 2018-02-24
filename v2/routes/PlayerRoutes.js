'use strict';
module.exports = function(router) {
    const player = require('../controllers/PlayerController');

    // Auth
    router.use(require("../util/Authentication"));

    router.route('/players/authenticate').post(player.authenticate);
};
