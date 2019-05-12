"use strict";

const logger = require("../../setup/logger");
const status = require("http-status");
const locationController = require("../controllers").locations;
/**
 * Routes for health-check
 * @param  {express} app the express obj
 */
const router = app => {
  /**
   * Get location route
   * @param req request
   * @param res response
   */
  app.get("/v1/locations", async (req, res) => {
    await locationController
      .list()
      .then(locations => {
        return res.status(status.OK).send(locations);
      })
      .catch(err => {
        logger.error(err);
        return res.status(status.INTERNAL_SERVER_ERROR).send(err);
      });
  });
  /**
   * Create location route
   * @param req request
   * @param res response
   */
  app.post("/v1/locations", async (req, res) => {
    const { body } = req;
    await locationController
      .create(body)
      .then(locationCreated => {
        return res.status(status.OK).send(locationCreated);
      })
      .catch(err => {
        logger.error(err);
        return res.status(status.INTERNAL_SERVER_ERROR).send(err);
      });
  });
  /**
   * Update location route
   * @param req request
   * @param res response
   */
  app.put("/v1/locations/:id", async (req, res) => {
    const { body } = req;
    const { id } = req.params;
    await locationController
      .update(id, body)
      .then(locationUpdated => {
        return res.status(status.OK).send(locationUpdated);
      })
      .catch(err => {
        logger.error(err);
        return res.status(err.status).send(err);
      });
  });
  /**
   * Delete location route
   * @param req request
   * @param res response
   */
  app.delete("/v1/locations/:id", async (req, res) => {
    const { id } = req.params;
    await locationController
      .delete(id)
      .then(locationDeleted => {
        return res.status(status.OK).send(locationDeleted);
      })
      .catch(err => {
        logger.error(err);
        return res.status(err.status).send(err);
      });
  });
};

module.exports = router;
