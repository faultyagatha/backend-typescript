import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import throttle from "lodash";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import makeStore, { saveState } from "./redux/store";
import "./index.css";
import "./bootstrap.min.css";

const store = makeStore();

// store.subscribe(throttle(() => {
//   saveState({
//     user: store.getState().user,
//     product: store.getState().product,
//   })
// }, 1000));

store.subscribe(() => {
  saveState({
    user: store.getState().user,
    product: store.getState().product,
  });
});

const WithProvider = () => (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

ReactDOM.render(<WithProvider />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
