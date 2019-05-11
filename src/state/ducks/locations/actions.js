import * as types from "./types";

//start fetching locations
export function fetchLocations() {
  return {
    type: types.FETCH_LOCATIONS_START,
  };
}

//fetching locations completed
export function fetchLocationsSuccess(response) {
  return {
    type: types.FETCH_LOCATIONS_COMPLETED,
    locations: response
  };
}

//fetching locations failed
export function fetchLocationsFailed(error) {
  return {
    type: types.FETCH_LOCATIONS_FAILED,
    error
  };
}

//start creating locations
export function createLocations(location) {
  return {
    type: types.CREATE_LOCATION_START,
    location
  };
}

//creating locations completed
export function createLocationsSuccess(response) {
  return {
    type: types.CREATE_LOCATION_COMPLETED,
    locations: response
  };
}

//creating locations failed
export function createLocationsFailed(error) {
  return {
    type: types.CREATE_LOCATION_FAILED,
    error
  };
}

//start updating locations
export function updateLocations(location) {
  return {
    type: types.UPDATE_LOCATION_START,
    location
  };
}

//updating locations completed
export function updateLocationsSuccess(response) {
  return {
    type: types.UPDATE_LOCATION_COMPLETED,
    locations: response
  };
}

//updating locations failed
export function updateLocationsFailed(error) {
  return {
    type: types.UPDATE_LOCATION_FAILED,
    error
  };
}

//start deleting locations
export function deleteLocations(id) {
  return {
    type: types.DELETE_LOCATION_START,
    id
  };
}

//deleting locations completed
export function deleteLocationsSuccess(response) {
  return {
    type: types.DELETE_LOCATION_COMPLETED,
    locations: response
  };
}

//deleting locations failed
export function deleteLocationsFailed(error) {
  return {
    type: types.DELETE_LOCATION_FAILED,
    error
  };
}

