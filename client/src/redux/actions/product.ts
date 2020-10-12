import { Dispatch } from "redux";
import axios from "axios";

import {
  GET_PRODUCTS,
  // GET_PRODUCT,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  ProductActions,
  Product,
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_SUCCESS,
} from "../../types";

const baseURL = "http://localhost:5000/api/v1/products";

function addProduct(product: Product): ProductActions {
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

function getProductsFail(error: any): ProductActions {
  return {
    type: GET_PRODUCTS_FAIL,
    payload:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.response.statusText,
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
      console.log(err);
      return dispatch(getProductsFail(err));
    }
  };
}

export function fetchProduct(productId: string) {
  return async (dispatch: Dispatch, getState: any) => {
    try {
      const { data } = await axios.get(`${baseURL}/${productId}`);
      dispatch(addProduct(data));
      localStorage.setItem("inCart", JSON.stringify(getState().product.inCart));
    } catch (err) {
      console.log(err);
    }
  };
}

// function getProduct(product: Product): ProductActions {
//   return {
//     type: GET_PRODUCT,
//     payload: { product }
//   }
// }

/** Async actions processed by redux-thunk middleware */
// export function fetchProducts(): any {
//   return async (dispatch: Dispatch) => {
//     const { data } = await getAllProducts();
//     console.log(data);
//     return dispatch(getProducts(data));
//   };
// }

// export function fetchProduct(productId: string) {
//   return async (dispatch: Dispatch) => {
//     const { data } = await getProductById(productId)
//     console.log(data)
//     dispatch(getProduct(data));
//   }
// }
