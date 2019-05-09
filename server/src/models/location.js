'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    status: DataTypes.BOOLEAN
  }, {});
  Location.associate = function(models) {
    // associations can be defined here
  };
  return Location;
};