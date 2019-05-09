'use strict';

const cors = require('cors');
const healthCheckRoute = require('./health-check-route');
const locationsRoute = require('./locations-route');
/**
 * Routing general setup
 * @param  {express} app  the express obj
 */
let routes = (app) => {
    app.options('*', cors());

    app.all('*', function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers',
            'X-Requested-With, Content-Type, Accept');
        res.header('Access-Control-Allow-Methods',
            'GET, POST, PUT, DELETE, OPTIONS');

        next();

    });

    healthCheckRoute(app);
    locationsRoute(app);
};

module.exports = routes;