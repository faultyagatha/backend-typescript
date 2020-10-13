import { combineReducers } from "redux";

import product from "./product";
import user from "./user";
import error from "./error";

const createRootReducer = () =>
  combineReducers({
    product,
    user,
    error,
  });

export default createRootReducer;
