import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";

import { AppState } from "../types";
import createRootReducer from "./reducers";
import rootSaga from "./sagas";

const initState: AppState = {
  product: {
    allProducts: [],
    loading: true,
    error: "",
    inCart: [],
  },
  user: {
    user: {},
    allUsers: [],
    error: "",
    success: true,
  },
  error: {
    error: "",
  },
};

export default function makeStore(initialState = initState) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, thunk];
  let composeEnhancers = compose;

  if (process.env.NODE_ENV === "development") {
    if ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    }
  }

  //must be above the store!!
  // const productItemsFromStorage = localStorage.getItem("product") || "";
  // console.log(localStorage.store);
  // if (productItemsFromStorage) {
  //   initialState = JSON.parse(productItemsFromStorage);
  // }

  // const usersFromStorage = localStorage.getItem("user") || "";
  // if (usersFromStorage) initialState = JSON.parse(usersFromStorage);

  // const cartItemsFromStorage = localStorage.getItem("inCart") || "";
  // if (cartItemsFromStorage) initialState = JSON.parse(cartItemsFromStorage);

  const savedStore = localStorage.getItem("store") || "";
  if (savedStore) initialState = JSON.parse(savedStore);
  console.log(localStorage);

  const store = createStore(
    createRootReducer(),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  sagaMiddleware.run(rootSaga);

  if ((module as any).hot) {
    (module as any).hot.accept("./reducers", () => {
      const nextReducer = require("./reducers").default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
