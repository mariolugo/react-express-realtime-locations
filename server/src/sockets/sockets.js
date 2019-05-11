"use strict";

const logger = require("../../setup/logger");

const SocketsLocations = {};

/**
 * All the sockets for the locations
 * i'm using io.emit because this will broadcast all including sender,
 * socket.broadcast.emit() send message to all excluding the sender.
 */

/**
 * Ping connection
 * @param socket the socket to listen
 * @param io emit to all connections including sender
 */
SocketsLocations.ping = (socket,io) => {
  socket.on("PING", state => {
    logger.debug(state);
    io.emit("PONG", "PONG");
  });
};

/**
 * Listen when new location is created and emit event
 * @param socket the socket to listen
 * @param io emit to all connections including sender
 */
SocketsLocations.newLocations = (socket,io) => {
  socket.on("locations/NEW_LOCATIONS", state => {
    io.emit("locations/emit/NEW_LOCATIONS");
  });
}

/**
 * Listen when location is updated and emit event
 * @param socket the socket to listen
 * @param io emit to all connections including sender
 */
SocketsLocations.updatedLocation = (socket,io) => {
  socket.on("locations/UPDATED_LOCATION", state => {
    io.emit("locations/emit/UPDATED_LOCATION");
  });
}

/**
 * Listed when location is deleted  and emit event
 * @param socket the socket to listen
 * @param io emit to all connections including sender
 */
SocketsLocations.deletedLocation = (socket,io) => {
  socket.on("locations/DELETED_LOCATION", state => {
    io.emit("locations/emit/DELETED_LOCATION");
  });
}

module.exports = SocketsLocations;
