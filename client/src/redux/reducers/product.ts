import {
  ProductState,
  ProductActions,
  GET_PRODUCTS,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  GET_PRODUCTS_SUCCESS,
  CREATE_PRODUCT_ADMIN,
  UPDATE_PRODUCT_ADMIN,
  DELETE_PRODUCT_ADMIN,
} from "../../types";

export default function product(
  state: ProductState = {
    product: {
      name: "Sample Name",
      imageCover: "Sample Image",
      description: "Sample Description",
      difficulty: "easy",
      duration: 0,
      price: 1,
    },
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
    case CREATE_PRODUCT_ADMIN: {
      const { product } = action.payload;
      return { ...state, allProducts: state.allProducts.concat(product) };
    }
    case UPDATE_PRODUCT_ADMIN: {
      const { product } = action.payload;
      return { ...state, product };
    }
    case DELETE_PRODUCT_ADMIN: {
      return { ...state };
    }

    default:
      return state;
  }
}
