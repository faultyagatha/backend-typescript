import { Dispatch } from "redux";
import axios from "axios";

import {
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  ProductActions,
  Product,
} from "../../types";
import { actionFail } from "./errors";

const baseURL = "http://localhost:5000/api/v1/products";

function addProduct(product: Product): ProductActions {
  return {
    type: ADD_PRODUCT,
    payload: { product },
  };
}

function removeProduct(product: Product): ProductActions {
  return {
    type: REMOVE_PRODUCT,
    payload: { product },
  };
}

function getProducts(): ProductActions {
  return {
    type: GET_PRODUCTS,
  };
}

function getProductsSuccess(data: Product[]): ProductActions {
  return {
    type: GET_PRODUCTS_SUCCESS,
    payload: { allProducts: data },
  };
}

/** Async actions processed by redux-thunk middleware */
export function fetchProducts(): any {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(getProducts());
      const { data } = await axios.get(baseURL);
      console.log(data);
      return dispatch(getProductsSuccess(data));
    } catch (err) {
      return dispatch(actionFail(err));
    }
  };
}

export function addProductToCart(product: Product): any {
  return async (dispatch: Dispatch, getState: any) => {
    try {
      localStorage.setItem("inCart", JSON.stringify(getState().product.inCart));
      dispatch(addProduct(product));
    } catch (err) {
      return dispatch(actionFail(err));
    }
  };
}

export function removeProductFromCart(product: Product): any {
  return async (dispatch: Dispatch, getState: any) => {
    try {
      localStorage.setItem("inCart", JSON.stringify(getState().product.inCart));
      dispatch(removeProduct(product));
    } catch (err) {
      return dispatch(actionFail(err));
    }
  };
}
