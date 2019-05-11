const Locations = require("../models").Location;
const BPromise = require("bluebird");
const status = require("http-status");
const logger = require("../../setup/logger");
let LocationsController = {};

/**
 * List all created locations
 */
LocationsController.list = async () => {
  return new BPromise(async (resolve, reject) => {
    await Locations.findAll({
      order: [["id", "ASC"]]
    })
      .then(locations => resolve(locations))
      .catch(error => {
        reject(error);
      });
  });
};

/**
 * Create a location controller
 * @param location location to create
 */
LocationsController.create = async location => {
  return new BPromise(async (resolve, reject) => {
    await Locations.create({
      ...location
    })
      .then(location => {
        if (!location) {
          reject({
            status: status.INTERNAL_SERVER_ERROR,
            message: `Location could not be created`
          });

          return Locations.findAll({
            order: [["id","ASC"]]
          });
        }
      })
      .then((locations)=> resolve(locations))
      .catch(error => {
        reject(error);
      });
  });
};

/**
 * Update a location controller
 * @param id id for the location
 * @param locationBody values to update
 */
LocationsController.update = async (id, locationBody) => {
  return new BPromise(async (resolve, reject) => {
    logger.debug("id", id);
    if (isNaN(id)) {
      reject({
        status: status.NOT_ACCEPTABLE,
        message: "Id must be a number"
      });
    }
    await Locations.findByPk(id)
      .then(location => {
        if (!location) {
          reject({
            status: status.NOT_FOUND,
            message: `Location with id ${id} not found`
          });
        }
        return location.update({
          ...locationBody
        });
      })
      .then( () => {
        return Locations.findAll({
          order: [["id", "ASC"]]
        });
      })
      .then((locations)=> resolve(locations))
      .catch(error => reject(error));
  });
};

module.exports = LocationsController;
