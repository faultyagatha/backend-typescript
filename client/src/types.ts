// Action types
export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCT = "GET_PRODUCT";
export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";

export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const GOOGLE_LOGIN = "GOOGLE_LOGIN";

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

export type GetProductAction = {
  type: typeof GET_PRODUCT;
  payload: { product: Product };
};

export type AddProductAction = {
  type: typeof ADD_PRODUCT;
  payload: { product: Product };
};

export type RemoveProductAction = {
  type: typeof REMOVE_PRODUCT;
  payload: { product: Product };
};

// Use this union in reducer
export type ProductActions =
  | GetProductsAction
  | GetProductAction
  | AddProductAction
  | RemoveProductAction;

export type ProductState = {
  allProducts: Product[];
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
  id: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  firstName?: string;
  lastName?: string;
  role?: string;
};

export type CurrentUser = {
  id?: string;
  email?: string;
  password?: string;
  passwordConfirmation?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
};

export type LoginAction = {
  type: typeof LOGIN;
  payload: { user: CurrentUser };
};

export type LogoutAction = {
  type: typeof LOGOUT;
};

export type GoogleLoginAction = {
  type: typeof GOOGLE_LOGIN;
  payload: { user: CurrentUser };
};

export type SignupAction = {
  type: typeof SIGNUP;
  payload: { user: User };
};

export type UserActions =
  | LoginAction
  | LogoutAction
  | SignupAction
  | GoogleLoginAction;

export type UserState = {
  user: CurrentUser;
};