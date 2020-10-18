// Action types
export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

export const ADD_PRODUCT = "ADD_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const CREATE_PRODUCT_ADMIN = "CREATE_PRODUCT_ADMIN";
export const UPDATE_PRODUCT_ADMIN = "UPDATE_PRODUCT_ADMIN";
export const DELETE_PRODUCT_ADMIN = "DELETE_PRODUCT_ADMIN";

export const SIGNUP_REQ = "SIGNUP_REQ";
export const LOGIN_REQ = "LOGIN_REQ";
export const LOGOUT_REQ = "LOGOUT_REQ";
export const GOOGLE_LOGIN_REQ = "GOOGLE_LOGIN_REQ";

export const GET_USER_REQ = "GET_USER_REQ";
export const UPDATE_USER_REQ = "UPDATE_USER_REQ";

export const GET_USERS_ADMIN = "GET_USERS_ADMIN";
export const UPDATE_USER_ADMIN = "UPDATE_USER_ADMIN";
export const DELETE_USER_ADMIN = "DELETE_USER_ADMIN";

export const ACTION_FAIL = "ACTION_FAIL";

export type Product = {
  _id?: string;
  name: string;
  imageCover: string;
  description: string;
  difficulty: string;
  duration: number;
  price: number;
};

export type User = {
  _id?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
  firstName?: string;
  lastName?: string;
  isAdmin?: boolean;
};

export type ProductState = {
  product: Product;
  allProducts: Product[];
  loading: boolean;
  inCart: Product[];
};

export type UserState = {
  user: User;
  allUsers: User[];
};

export type AppState = {
  product: ProductState;
  user: UserState;
  error: any;
};

export type GetProductsAction = {
  type: typeof GET_PRODUCTS;
};

export type GetProductsSuccessAction = {
  type: typeof GET_PRODUCTS_SUCCESS;
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

export type CreateProductAdminAction = {
  type: typeof CREATE_PRODUCT_ADMIN;
  payload: { product: Product };
};

export type UpdateProductAdminAction = {
  type: typeof UPDATE_PRODUCT_ADMIN;
  payload: { product: Product };
};

export type DeleteProductAdminAction = {
  type: typeof DELETE_PRODUCT_ADMIN;
};

// Use this union in reducer
export type ProductActions =
  | GetProductsAction
  | GetProductsSuccessAction
  | AddProductAction
  | RemoveProductAction
  | CreateProductAdminAction
  | UpdateProductAdminAction
  | DeleteProductAdminAction;

export type LoginAction = {
  type: typeof LOGIN_REQ;
  payload: { user: User };
};

export type LogoutAction = {
  type: typeof LOGOUT_REQ;
  payload: { user: User };
};

export type GoogleLoginAction = {
  type: typeof GOOGLE_LOGIN_REQ;
  payload: { user: User };
};

export type SignupAction = {
  type: typeof SIGNUP_REQ;
  payload: { user: User };
};

export type GetUserAction = {
  type: typeof GET_USER_REQ;
  payload: { user: User };
};

export type UpdateUserAction = {
  type: typeof UPDATE_USER_REQ;
  payload: { user: User };
};

export type GetUsersAdminAction = {
  type: typeof GET_USERS_ADMIN;
  payload: { allUsers: User[] };
};

export type UpdateUserAdminAction = {
  type: typeof UPDATE_USER_ADMIN;
  payload: { user: User };
};

export type DeleteUserAdminAction = {
  type: typeof DELETE_USER_ADMIN;
};

export type UserActions =
  | LoginAction
  | LogoutAction
  | SignupAction
  | GoogleLoginAction
  | GetUserAction
  | UpdateUserAction
  | GetUsersAdminAction
  | UpdateUserAdminAction
  | DeleteUserAdminAction;

export type ErrorAction = {
  type: typeof ACTION_FAIL;
  payload: { error: any };
};

export type GoBackBtn = {
  handleGoBackClick: (event: any) => void;
};

export type AddToCartBtn = {
  handleClick: (event: any) => void;
  isDisabled: boolean;
};

export type MessageType = ({
  variant,
  children,
}: {
  variant: string;
  children: any;
}) => JSX.Element;

export type WithChildren = ({ children }: { children?: any }) => JSX.Element;
