'use strict';

const logger = require('../../setup/logger');
const socketsLocations = require('./sockets');

let sockets = (server) => {
    const io = require('socket.io')(server);

    io.on('connection', socket => {
        logger.info('Sockets connected');

        socketsLocations.ping(socket,io);
        socketsLocations.newLocations(socket,io);
        socketsLocations.updatedLocation(socket,io);
        socketsLocations.deletedLocation(socket,io);
    });

    
}

module.exports = sockets;