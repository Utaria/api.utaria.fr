const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const config     = require('./storage/config');
const morgan     = require('morgan');


// Some configuration before routes
app.enable('trust proxy');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

const router = new express.Router();

/* ---------------------[[ VERSION 2 ]]--------------------- */

// All routes
const prefix = './v' + config.version + '/routes/';

require(prefix + 'GlobalRoutes')(router);
require(prefix + 'PluginRoutes')(router);
require(prefix + 'PlayerRoutes')(router);

/* --------------------------------------------------------- */

// Global routes
app.use("/v" + config.version, router);
app.route('/').get(function(req, res) {
    res.json({ message: "hooray! Welcome to Utaria's API!", version: config.version, base_url: req.server });
});

// Some actions
app.disable("x-powered-by");

// 404: Not Found
app.use(function(req, res) {
    res.status(404).send({
        error: "Not Found",
        message: "Resource " + req.originalUrl + " cannot be found!"
    })
});


// Start server!
app.listen(config.port);
console.log('Magic happens on port ' + config.port + '!');