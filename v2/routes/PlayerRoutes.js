'use strict';
module.exports = function(router) {
    const player = require('../controllers/PlayerController');

    // Auth
    router.use(require("../util/Authentication"));

    // Auth
    router.route('/players/authenticate').post(player.authenticate);
};
