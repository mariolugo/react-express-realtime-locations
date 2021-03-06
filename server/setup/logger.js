"use strict";

const bunyan = require("bunyan"),
  bformat = require("bunyan-format"),
  gelfStream = require("gelf-stream"),
  formatDev = bformat({ outputMode: "long" });


const env = "development";
let appName = "Realtime-Map";
if (typeof appName === "undefined") {
  appName = "no_name";
}
const loggerLevel = "debug";
let bunyanOptions = {
  name: appName,
  level: loggerLevel
};

console.log(env);
//long output
bunyanOptions.stream = formatDev;
//dont print full development path
bunyanOptions.src = false;

let log = bunyan.createLogger(bunyanOptions);

module.exports = log;
