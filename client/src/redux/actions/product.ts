import { Dispatch } from "redux";

import {
  GET_PRODUCTS,
  GET_PRODUCT,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  ProductActions,
  Product,
} from "../../types";
import { getAllProducts, getProductById } from "../../api";

export function addProduct(product: Product): ProductActions {
  console.log(product);
  return {
    type: ADD_PRODUCT,
    payload: { product },
  };
}

export function removeProduct(product: Product): ProductActions {
  return {
    type: REMOVE_PRODUCT,
    payload: { product },
  };
}

function getProducts(data: Product[]): ProductActions {
  return {
    type: GET_PRODUCTS,
    payload: { allProducts: data },
  };
}

function getProduct(product: Product): ProductActions {
  console.log(product);
  return {
    type: GET_PRODUCT,
    payload: { product },
  };
}

/** Async actions processed by redux-thunk middleware */
export function fetchProducts(): any {
  return async (dispatch: Dispatch) => {
    const { data } = await getAllProducts();
    console.log(data);
    return dispatch(getProducts(data));
  };
}

export function fetchProduct(productId: string) {
  return async (dispatch: Dispatch) => {
    const { data } = await getProductById(productId);
    console.log(data);
    dispatch(getProduct(data));
  };
}
