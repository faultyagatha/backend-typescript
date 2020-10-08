import { Dispatch } from "redux";

import {
  GET_PRODUCTS,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  ProductActions,
  Product,
} from "../../types";
import { getAllProducts } from "../../api";

export function addProduct(product: Product): ProductActions {
  return {
    type: ADD_PRODUCT,
    payload: {
      product,
    },
  };
}

export function removeProduct(product: Product): ProductActions {
  return {
    type: REMOVE_PRODUCT,
    payload: {
      product,
    },
  };
}

// Async action processed by redux-thunk middleware
export function fetchProduct(productId: string) {
  return (dispatch: Dispatch) => {
    return fetch(`products/${productId}`)
      .then((resp) => resp.json())
      .then((product) => {
        dispatch(addProduct(product));
      });
  };
}

function getProducts(data: Product[]): ProductActions {
  return {
    type: GET_PRODUCTS,
    payload: { allProducts: data },
  };
}

export function fetchProducts(): any {
  return async (dispatch: Dispatch) => {
    const { data } = await getAllProducts();
    console.log(data);
    return dispatch(getProducts(data));
  };
}
