import {
  ProductState,
  ProductActions,
  GET_PRODUCTS,
  GET_PRODUCTS_FAIL,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
} from "../../types";

export default function product(
  state: ProductState = {
    allProducts: [],
    error: "",
    inCart: [],
  },
  action: ProductActions
): ProductState {
  switch (action.type) {
    case GET_PRODUCTS: {
      const { allProducts } = action.payload;
      return { ...state, allProducts };
    }
    case GET_PRODUCTS_FAIL: {
      const error = action.payload;
      return { ...state, error };
    }
    case ADD_PRODUCT: {
      const { product } = action.payload;
      if (state.inCart.find((p) => p.name === product.name)) {
        return state;
      }
      return { ...state, inCart: [...state.inCart, product] };
    }

    case REMOVE_PRODUCT: {
      const { product } = action.payload;
      const index = state.inCart.findIndex((p) => p.name === product.name);
      if (index >= 0) {
        state.inCart.splice(index, 1);
        return { ...state, inCart: [...state.inCart] };
      }
      return state;
    }

    default:
      return state;
  }
}
