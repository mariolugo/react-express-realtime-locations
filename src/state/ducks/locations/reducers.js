import { combineReducers } from "redux";
import * as types from "./types";
import { createReducer } from "../../utils";

const initState = {
  isFetching: false,
  locations: []
};

const reducers = createReducer(initState)({
  //fetching location reducers
  [types.FETCH_LOCATIONS_START]: (state, action) => {
    return {
      isFetching: true
    };
  },
  [types.FETCH_LOCATIONS_COMPLETED]: (state, action) => {
    return {
      locations: action.locations,
      isFetching: false
    };
  },
  [types.FETCH_LOCATIONS_FAILED]: (state, action) => {
    return {
      error: action.error,
      isFetching: false
    };
  },
  //creating location reducers
  [types.CREATE_LOCATION_START]: (state, action) => {
    return {
      isFetching: true
    };
  },
  [types.CREATE_LOCATION_COMPLETED]: (state, action) => {
    return {
      locations: action.items,
      isFetching: false
    };
  },
  [types.CREATE_LOCATION_FAILED]: (state, action) => {
    return {
      error: action.error,
      isFetching: false
    };
  },
  //updating location reducers
  [types.UPDATE_LOCATION_START]: (state, action) => {
    return {
      isFetching: true
    };
  },
  [types.UPDATE_LOCATION_COMPLETED]: (state, action) => {
    return {
      locations: action.locations,
      isFetching: false,
      updated: true
    };
  },
  [types.UPDATE_LOCATION_FAILED]: (state, action) => {
    return {
      error: action.error,
      isFetching: false
    };
  },
  //deleting location reducers
  [types.DELETE_LOCATION_START]: (state, action) => {
    return {
      isFetching: true
    };
  },
  [types.DELETE_LOCATION_COMPLETED]: (state, action) => {
    return {
      locations: action.locations,
      isFetching: false
    };
  },
  [types.DELETE_LOCATION_FAILED]: (state, action) => {
    return {
      error: action.error,
      isFetching: false
    };
  },
});

export default combineReducers({
  locations: reducers
});
