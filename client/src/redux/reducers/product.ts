import {
  ProductState,
  ProductActions,
  GET_PRODUCTS,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  GET_PRODUCTS_SUCCESS,
} from "../../types";

export default function product(
  state: ProductState = {
    allProducts: [],
    loading: true,
    inCart: [],
  },
  action: ProductActions
): ProductState {
  switch (action.type) {
    case GET_PRODUCTS: {
      return { ...state };
    }
    case GET_PRODUCTS_SUCCESS: {
      const { allProducts } = action.payload;
      return { ...state, allProducts, loading: false };
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
