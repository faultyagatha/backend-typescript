// Action types
export const GET_PRODUCTS = "GET_PRODUCTS";
// export const GET_PRODUCT = "GET_PRODUCT";
export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const GET_PRODUCTS_FAIL = "GET_PRODUCTS_FAIL";
export const FETCH_PRODUCTS_FAIL = "FETCH_PRODUCTS_FAIL";
export const ADD_PRODUCT_FAIL = "ADD_PRODUCT_FAIL";
export const REMOVE_PRODUCT_FAIL = "REMOVE_PRODUCT_FAIL";

export const SIGNUP_REQ = "SIGNUP_REQ";
export const LOGIN_REQ = "LOGIN_REQ";
export const LOGOUT_REQ = "LOGOUT_REQ";
export const GOOGLE_LOGIN_REQ = "GOOGLE_LOGIN_REQ";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const SIGNUP_FAIL = "SIGNUP_FAIL";
export const LOGOUT_FAIL = "LOGOUT_FAIL";
export const GOOGLE_LOGIN_FAIL = "GOOGLE_LOGIN_FAIL";

// A product
export type Product = {
  id?: string;
  name: string;
  imageCover: string;
  description: string;
  difficulty: string;
  duration: number;
  price: number;
};

export type GetProductsAction = {
  type: typeof GET_PRODUCTS;
  payload: { allProducts: Product[] };
};

export type AddProductAction = {
  type: typeof ADD_PRODUCT;
  payload: { product: Product };
};

export type RemoveProductAction = {
  type: typeof REMOVE_PRODUCT;
  payload: { product: Product };
};

export type GetProductsFailAction = {
  type: typeof GET_PRODUCTS_FAIL;
  payload: { allProducts: Product[] };
};

export type AddProductFailAction = {
  type: typeof ADD_PRODUCT_FAIL;
  payload: { product: Product };
};

export type RemoveProductFailAction = {
  type: typeof REMOVE_PRODUCT_FAIL;
  payload: { product: Product };
};

// Use this union in reducer
export type ProductActions =
  | GetProductsAction
  // | GetProductAction
  | AddProductAction
  | RemoveProductAction
  | GetProductsFailAction
  | AddProductFailAction
  | RemoveProductFailAction;

export type ProductState = {
  allProducts: Product[];
  error: any;
  inCart: Product[];
};

export type AppState = {
  product: ProductState;
  user: UserState;
};

export type GoBackBtn = {
  handleGoBackClick: (event: any) => void;
};

export type AddToCartBtn = {
  handleClick: (event: any) => void;
  isDisabled: boolean;
};

export type User = {
  id?: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  firstName?: string;
  lastName?: string;
  role?: string;
};

// export type CurrUser = {
//   id?: string;
//   email?: string;
//   password?: string;
//   passwordConfirmation?: string;
//   firstName?: string;
//   lastName?: string;
//   role?: string;
// };

export type LoginAction = {
  type: typeof LOGIN_REQ;
  payload: { user: User };
};

export type LogoutAction = {
  type: typeof LOGOUT_REQ;
};

export type GoogleLoginAction = {
  type: typeof GOOGLE_LOGIN_REQ;
  payload: { user: User };
};

export type SignupAction = {
  type: typeof SIGNUP_REQ;
  payload: { user: User };
};

export type LoginFailAction = {
  type: typeof LOGIN_FAIL;
  payload: { error: any };
};

export type LoginGoogleFailAction = {
  type: typeof GOOGLE_LOGIN_REQ;
  payload: { error: any };
};

export type SignupFailAction = {
  type: typeof SIGNUP_FAIL;
  payload: { error: any };
};

export type UserActions =
  | LoginAction
  | LogoutAction
  | SignupAction
  | GoogleLoginAction
  | LoginFailAction
  | SignupFailAction
  | LoginGoogleFailAction;

export type UserState = {
  user: User;
  error: any;
};
