/** action types */
export const GET_PRODUCTS = "GET_PRODUCTS";
export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

export const ADD_PRODUCT = "ADD_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const REMOVE_ALL_PRODUCTS = "REMOVE_ALL_PRODUCTS";
export const CREATE_PRODUCT_ADMIN = "CREATE_PRODUCT_ADMIN";
export const UPDATE_PRODUCT_ADMIN = "UPDATE_PRODUCT_ADMIN";
export const DELETE_PRODUCT_ADMIN = "DELETE_PRODUCT_ADMIN";

export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const GOOGLE_LOGIN = "GOOGLE_LOGIN";
export const ADD_PRODUCT_TO_USER = "ADD_PRODUCT_TO_USER";
export const REMOVE_PRODUCT_FROM_USER = "REMOVE_PRODUCT_FROM_USER";

export const GET_USER = "GET_USER";
export const UPDATE_USER = "UPDATE_USER";

export const GET_USERS_ADMIN = "GET_USERS_ADMIN";
export const UPDATE_USER_ADMIN = "UPDATE_USER_ADMIN";
export const DELETE_USER_ADMIN = "DELETE_USER_ADMIN";

export const ACTION_FAIL = "ACTION_FAIL";
export const LOADING = "LOADING";
export const RESET_UI = "RESET_UI";

/** product actions */
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

export type RemoveAllProductsAction = {
  type: typeof REMOVE_ALL_PRODUCTS;
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
  | AddProductAction
  | RemoveProductAction
  | RemoveAllProductsAction
  | CreateProductAdminAction
  | UpdateProductAdminAction
  | DeleteProductAdminAction;

/** user actions */
export type LoginAction = {
  type: typeof LOGIN;
  payload: { user: User };
};

export type LogoutAction = {
  type: typeof LOGOUT;
  payload: { user: User };
};

export type GoogleLoginAction = {
  type: typeof GOOGLE_LOGIN;
  payload: { user: User };
};

export type SignupAction = {
  type: typeof SIGNUP;
  payload: { user: User };
};

export type GetUserAction = {
  type: typeof GET_USER;
  payload: { user: User };
};

export type UpdateUserAction = {
  type: typeof UPDATE_USER;
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

export type AddProductUserAction = {
  type: typeof ADD_PRODUCT_TO_USER;
  payload: Product;
};

export type RemoveProductUserAction = {
  type: typeof REMOVE_PRODUCT_FROM_USER;
  payload: Product;
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
  | DeleteUserAdminAction
  | AddProductUserAction
  | RemoveProductUserAction;

/** error action */
export type ErrorAction = {
  type: typeof ACTION_FAIL;
  payload: { error: any };
};

export type LoadingAction = {
  type: typeof LOADING;
};

export type ResetAction = {
  type: typeof RESET_UI;
};

export type UIActions = ErrorAction | LoadingAction | ResetAction;

/** product type */
export type Product = {
  _id?: string;
  name: string;
  imageCover: string;
  description: string;
  distance: string;
  duration: number;
  price: number;
};

/** user type */
export type User = {
  _id?: string;
  email: string;
  password: string;
  passwordConfirm: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  products: Product[];
};

/** state types */
export type ProductState = {
  product: Product;
  allProducts: Product[];
  inCart: Product[];
};

export type UserState = {
  user: User;
  isLoggedIn: boolean;
  allUsers: User[];
};

export type UIState = {
  error: any;
  isLoading: boolean;
};

export type AppState = {
  product: ProductState;
  user: UserState;
  ui: UIState;
};

/** component types */
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

export type NavButton = ({
  children,
  linkStr,
}: {
  children?: any;
  linkStr: string;
}) => JSX.Element;
export type WithChildren = ({ children }: { children?: any }) => JSX.Element;

export type ParamsType = { id: string };

export type StepsType = ({
  step1,
  step2,
  step3,
}: {
  step1: string;
  step2: string;
  step3: string;
}) => JSX.Element;
