module.exports = function(router) {

    const global = require('../controllers/GlobalController');

    // Home
    router.route('/').get(global.home_version);
    // Authenticate for the rest of the API
    router.route('/authenticate').post(global.authenticate);

};
