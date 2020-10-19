import { Dispatch } from "redux";
import axios from "axios";

import {
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  UPDATE_PRODUCT_ADMIN,
  DELETE_PRODUCT_ADMIN,
  ProductActions,
  Product,
  CREATE_PRODUCT_ADMIN,
} from "../../types";
import { actionFail } from "./errors";

const rootURL = "http://localhost:5000/api/v1/products";

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

function createProductAdmin(data: Product): ProductActions {
  return {
    type: CREATE_PRODUCT_ADMIN,
    payload: { product: data },
  };
}

function updateProductAdmin(data: Product): ProductActions {
  return {
    type: UPDATE_PRODUCT_ADMIN,
    payload: { product: data },
  };
}

function deleteProductAdmin(): ProductActions {
  return {
    type: DELETE_PRODUCT_ADMIN,
  };
}

/** Async actions processed by redux-thunk middleware */
export function fetchProducts(): any {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(getProducts());
      const { data } = await axios.get(rootURL);
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
      //localStorage.setItem("inCart", JSON.stringify(getState().product.inCart));
      dispatch(addProduct(product));
    } catch (err) {
      return dispatch(actionFail(err));
    }
  };
}

export function removeProductFromCart(product: Product): any {
  return async (dispatch: Dispatch, getState: any) => {
    try {
      //localStorage.setItem("inCart", JSON.stringify(getState().product.inCart));
      dispatch(removeProduct(product));
    } catch (err) {
      return dispatch(actionFail(err));
    }
  };
}

export function createProductByAdmin(product: Product): any {
  return async (dispatch: Dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(`${rootURL}`, product, config);
      dispatch(createProductAdmin(data));
    } catch (err) {
      return dispatch(actionFail(err));
    }
  };
}

export function updateProductByAdmin(product: Product): any {
  return async (dispatch: Dispatch) => {
    try {
      const id = product._id;
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.patch(`${rootURL}/${id}`, product, config);
      dispatch(updateProductAdmin(data));
    } catch (err) {
      return dispatch(actionFail(err));
    }
  };
}

export function deleteProductByAdmin(id: string): any {
  return async (dispatch: Dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`${rootURL}/${id}`, config);
      dispatch(deleteProductAdmin());
    } catch (err) {
      dispatch(actionFail(err));
    }
  };
}
