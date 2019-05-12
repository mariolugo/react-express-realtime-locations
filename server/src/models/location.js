'use strict';
module.exports = (sequelize, DataTypes) => {
  // Location model generated from sequelize-cli
  const Location = sequelize.define('Location', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    status: DataTypes.BOOLEAN
  }, {});
  return Location;
};