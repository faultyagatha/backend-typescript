import { combineReducers } from "redux";

import product from "./product";
import user from "./user";
import ui from "./ui";

const createRootReducer = () =>
  combineReducers({
    product,
    user,
    ui,
  });

export default createRootReducer;
