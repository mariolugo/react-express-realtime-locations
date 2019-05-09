'use strict';

const logger = require('./logger');

const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');
const http = require('http');

/**
 * Setup middlewares for express
 * @param  {express} app the express app
 */
let setupExpressMiddlewares = (app) => {
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}));
    app.use(morgan('dev'));
    app.use(compression());
    app.use(helmet());
  };

/**
 * Error callback for server
 * @param  {Error} error the error
 */
let onError = (error, server) => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    let addr = server.address();
    let bind = typeof addr === 'string' ? 'pipe ' + addr: 'port ' + addr.port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            logger.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            logger.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

/**
* Listening callback
* @param  {express} server [description]
*/
let onListening = (server) => {
   let addr = server.address();
   let bind = typeof addr === 'string' ? 'pipe ' + addr: 'port ' + addr.port;
   logger.info('Listening on ' + bind);
};

/**
 * Starts the server
 * @param  {express} app the express app
 */
let setupServer = (app) => {
    let serverPort = 4000;

    app.set('port', serverPort);

    let server = http.createServer(app);
    server.listen(serverPort);
    server.on('error', (error) => {
        onError(error, server);
    });
    server.on('listening', () => {
        onListening(server);
    });
};

/**
 * Setup error handlers for express
 * @param  {express} app the express app
 */
let setupErrorHandlers = (app) => {
    // catch 404 and forward to error handler
    app.use((req, res, next) => {
        let err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handlers

    // will print stacktrace
    app.use((err, req, res, next) => {
        res
            .status(err.status || 500)
            .send({
                message: err.message,
                code: err.status,
                description: err
            });
    });
};

/**
 * Setup express for this app
 * @param  {express} app the express app
 */
let setup = (app) => {
    setupExpressMiddlewares(app);
    setupServer(app);
    //setup routes
    require('../src/route/index')(app);
    setupErrorHandlers(app);
};

module.exports = setup;