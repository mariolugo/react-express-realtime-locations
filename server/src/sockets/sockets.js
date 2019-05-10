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

module.exports = SocketsLocations;
