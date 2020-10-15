import { takeLatest } from "redux-saga/effects";

import { ADD_PRODUCT, REMOVE_PRODUCT, AddProductAction } from "../../types";

function* saveStateAddProduct(action: AddProductAction) {
  yield console.log(action);
}

function* saveStateRemoveProduct(action: AddProductAction) {
  yield console.log(action);
}

export default [takeLatest(ADD_PRODUCT, saveStateRemoveProduct)];
