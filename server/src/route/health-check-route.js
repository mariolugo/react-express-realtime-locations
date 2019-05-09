'use strict';

const logger = require('../../setup/logger');
const status = require('http-status');

/**
 * Routes for health-check
 * @param  {express} app the express obj
 */
const router = (app) => {

    app.get('/v1/health-check', (req, res) => {
        logger.debug('OK');
        res.status(status.OK).send({'message': 'ok'});
    });
};

module.exports = router;
