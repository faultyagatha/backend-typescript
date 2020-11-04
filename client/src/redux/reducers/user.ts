import {
  UserState,
  UserActions,
  LOGIN,
  LOGOUT,
  SIGNUP,
  GET_USER,
  UPDATE_USER,
  GET_USERS_ADMIN,
  UPDATE_USER_ADMIN,
  DELETE_USER_ADMIN,
  ADD_PRODUCT_TO_USER,
  REMOVE_PRODUCT_FROM_USER,
} from "../../types";

export default function user(
  state: UserState = {
    user: {
      email: "",
      password: "",
      passwordConfirm: "",
      firstName: "",
      lastName: "",
      isAdmin: false,
      products: [],
    },
    allUsers: [],
    isLoggedIn: false,
  },
  action: UserActions
): UserState {
  switch (action.type) {
    case LOGIN: {
      const { user } = action.payload;
      return { ...state, user, isLoggedIn: true };
    }
    case SIGNUP: {
      const { user } = action.payload;
      console.log(user);
      return { ...state, user, isLoggedIn: true };
    }
    case LOGOUT: {
      const { user } = action.payload;
      return { ...state, user, isLoggedIn: false };
    }
    case GET_USER: {
      const { user } = action.payload;
      return { ...state, user };
    }
    case UPDATE_USER: {
      const { user } = action.payload;
      console.log(user);
      return { ...state, user };
    }
    case GET_USERS_ADMIN: {
      const { allUsers } = action.payload;
      return { ...state, allUsers };
    }
    case UPDATE_USER_ADMIN: {
      const { user } = action.payload;
      return { ...state, user };
    }
    case DELETE_USER_ADMIN: {
      return { ...state };
    }
    case ADD_PRODUCT_TO_USER: {
      const { user } = state;
      const products = user.products;
      const product = action.payload;
      if (products.find((p) => p.name === product.name)) {
        return state;
      }
      return {
        ...state,
        user: { ...user, products: [...products, product] },
      };
    }
    case REMOVE_PRODUCT_FROM_USER: {
      const { user } = state;
      const products = user.products;
      const product = action.payload;
      const index = products.findIndex((p) => p.name === product.name);
      if (index >= 0) {
        products.splice(index, 1);
        return {
          ...state,
          user: { ...user, products: [...products] },
        };
      }
      return state;
    }

    default:
      return state;
  }
}
