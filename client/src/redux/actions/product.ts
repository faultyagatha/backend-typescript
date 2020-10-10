import { Dispatch } from "redux";
import axios from "axios";

import {
  GET_PRODUCTS,
  // GET_PRODUCT,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  ProductActions,
  Product,
} from "../../types";

const baseURL = "http://localhost:5000/api/v1/products";

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

// function getProduct(product: Product): ProductActions {
//   return {
//     type: GET_PRODUCT,
//     payload: { product },
//   };
// }

/** Async actions processed by redux-thunk middleware */
export function fetchProducts(): any {
  return async (dispatch: Dispatch) => {
    const { data } = await axios.get(baseURL);
    console.log(data);
    return dispatch(getProducts(data));
  };
}

// export function fetchProduct(productId: string) {
//   return (dispatch: Dispatch) => {
//     return fetch(`products/${productId}`)
//       .then((resp) => resp.json())
//       .then((product) => {
//         dispatch(addProduct(product));
//       });
//   };
// }

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
