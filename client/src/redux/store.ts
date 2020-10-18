import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";

import { AppState } from "../types";
import createRootReducer from "./reducers";
// import rootSaga from "./sagas";

const initState: AppState = {
  product: {
    allProducts: [],
    loading: true,
    inCart: [],
  },
  user: {
    user: {},
    allUsers: [],
    success: true,
  },
  error: {
    error: "",
  },
};

export default function makeStore(initialState = loadState()) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, thunk];
  let composeEnhancers = compose;

  if (process.env.NODE_ENV === "development") {
    if ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    }
  }

  const initialstate = loadState();
  console.log("initialstate: ", initialstate);
  //must be above the store!!
  // const product = localStorage.getItem("product") || "";
  // console.log(localStorage.store);
  // if (product) {
  //   initialState = JSON.parse(product);
  // }

  // const user = localStorage.getItem("user") || "";
  // console.log(user)
  // if (user) initialState = JSON.parse(user);

  // const cartItemsFromStorage = localStorage.getItem("inCart") || "";
  // if (cartItemsFromStorage) initialState = JSON.parse(cartItemsFromStorage);

  // const savedStore = localStorage.getItem("store") || "";
  // if (savedStore) initialState = JSON.parse(savedStore);
  // console.log(localStorage);

  const store = createStore(
    createRootReducer(),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  console.log("localStorage: ", localStorage);

  // sagaMiddleware.run(rootSaga);

  if ((module as any).hot) {
    (module as any).hot.accept("./reducers", () => {
      const nextReducer = require("./reducers").default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

export const loadState = () => {
  try {
    const serialisedState = localStorage.getItem("state");
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: any) => {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem("state", serialisedState);
  } catch (err) {
    console.log("Error saving state: ", err);
  }
};
