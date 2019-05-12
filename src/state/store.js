import { createStore, applyMiddleware, combineReducers } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { compose } from "redux";
import * as reducers from "./ducks";
import { createLogger } from "./middlewares";
import { reducer as reduxFormReducer } from "redux-form";

import { combineEpics } from "redux-observable";
import {
  locationsListEpic,
  locationEditEpic,
  locationCreateEpic,
  locationDeleteEpic
} from "./ducks/locations/epics";

//get all epics and combine them
const rootEpic = combineEpics(
  locationsListEpic,
  locationEditEpic,
  locationCreateEpic,
  locationDeleteEpic
);

// create epic middleware
const epicMiddleware = createEpicMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const formReducer = {
  form: reduxFormReducer
};

//configure application store
export default function configureStore(initialState) {
  const rootReducer = combineReducers({
    ...reducers,
    ...formReducer
  });

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(epicMiddleware, createLogger(true)))
  );

  epicMiddleware.run(rootEpic);

  return store;
}
