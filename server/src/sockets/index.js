'use strict';

const logger = require('../../setup/logger');
const socketsLocations = require('./sockets');

/**
 * Enabling sockets and listeners general setup
 * @param  {express} server  the express obj
 */
let sockets = (server) => {
    const io = require('socket.io')(server);

    // open connection
    io.on('connection', socket => {
        logger.info('Sockets connected');

        socketsLocations.ping(socket,io);
        socketsLocations.newLocations(socket,io);
        socketsLocations.updatedLocation(socket,io);
        socketsLocations.deletedLocation(socket,io);
    });

    
}

module.exports = sockets;