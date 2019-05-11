import * as types from "./types";

import { of } from "rxjs";
import { map, catchError, mergeMap } from "rxjs/operators";
import { ofType } from "redux-observable";

import * as actions from "./actions";

import { ajax } from "rxjs/ajax";

const url = `http://localhost:4000/v1`;

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
