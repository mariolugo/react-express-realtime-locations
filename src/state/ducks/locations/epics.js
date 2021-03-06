import * as types from "./types";

import { of } from "rxjs";
import { map, catchError, mergeMap } from "rxjs/operators";
import { ofType } from "redux-observable";

import * as actions from "./actions";

import { ajax } from "rxjs/ajax";

const url = `http://localhost:4000/v1`;

/**
 * Location fetching epic
 */
export const locationsListEpic = action$ =>
  action$.pipe(
    ofType(types.FETCH_LOCATIONS_START),
    mergeMap(action => {
      return ajax
        .getJSON(`${url}/locations`) // getJSON simply sends a GET request with Content-Type application/json
        .pipe(
          map(response => {
            return actions.fetchLocationsSuccess(response);
          })
        ); // get the data and extract only the results
    }),
    catchError(error =>
      of({
        type: types.FETCH_LOCATIONS_FAILED,
        payload: "error",
        error
      })
    )
  );

/**
 * Location update epic
 */
export const locationEditEpic = action$ =>
  action$.pipe(
    ofType(types.UPDATE_LOCATION_START),
    mergeMap(action => {
      const { location } = action;
      return ajax.put(`${url}/locations/${location.id}`, location).pipe(
        map(response => {
          return actions.updateLocationsSuccess(response.response);
        })
      );
    }),
    catchError(error =>
      of({
        type: types.UPDATE_LOCATION_FAILED,
        payload: "error",
        error
      })
    )
  );

/**
 * Location creating epic
 */
export const locationCreateEpic = action$ =>
  action$.pipe(
    ofType(types.CREATE_LOCATION_START),
    mergeMap(action => {
      const { location } = action;
      return ajax.post(`${url}/locations`, location).pipe(
        map(response => {
          return actions.createLocationsSuccess(response.response);
        })
      );
    }),
    catchError(error =>
      of({
        type: types.CREATE_LOCATION_FAILED,
        payload: "error",
        error
      })
    )
  );

/**
 * Location delete epic
 */
export const locationDeleteEpic = action$ =>
  action$.pipe(
    ofType(types.DELETE_LOCATION_START),
    mergeMap(action => {
      const { id } = action;
      return ajax.delete(`${url}/locations/${id}`).pipe(
        map(response => {
          return actions.deleteLocationsSuccess(response.response);
        })
      );
    }),
    catchError(error =>
      of({
        type: types.DELETE_LOCATION_FAILED,
        payload: "error",
        error
      })
    )
  );
