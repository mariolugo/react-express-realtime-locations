import React from "react";
import ReactDOM from "react-dom";

import { AppLayout } from "./views/layouts";
import { mapRoutes } from "./utils";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";

import routes from "./routes";
import * as serviceWorker from "./serviceWorker";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";

import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./state/store";

import "./styles.css";

const reduxStore = configureStore(window.REDUX_INITIAL_DATA);
const history = createBrowserHistory();

ReactDOM.render(
  <ReduxProvider store={reduxStore}>
    <MuiThemeProvider theme={theme}>
      <Router history={history}>
        <AppLayout>{mapRoutes(routes)}</AppLayout>
      </Router>
    </MuiThemeProvider>
  </ReduxProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
