const jwt = require('jsonwebtoken');
const config = require('../../storage/config');

/**
 * @return {boolean}
 */
function Authentication(req, res, next) {

    // check header or url parameters or post parameters for token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, config.secretToken, function(err, decoded) {
            if (err) {
                return res.status(401).json({ error: 'Authentification failed', message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {
        return res.status(403).json({
            error: 'Authentification failed',
            message: 'No token provided.'
        });
    }
}

module.exports = Authentication;