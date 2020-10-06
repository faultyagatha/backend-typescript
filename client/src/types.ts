// Action types
export const GET_PRODUCTS = "GET_PRODUCTS";
export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";

export const TOGGLE_DIALOG = "TOGGLE_DIALOG";

// Enum
export enum DialogType {
  SignIn = "signIn",
  SignUp = "signUp",
}

// A product
export type Product = {
  id: string;
  name: string;
  imageCover: string;
  description: string;
  difficulty: string;
  duration: number;
  price: number;
};

export type GetProductsAction = {
  type: typeof GET_PRODUCTS;
  payload: {
    allProducts: Product[];
  };
};

export type AddProductAction = {
  type: typeof ADD_PRODUCT;
  payload: { product: Product };
};

export type RemoveProductAction = {
  type: typeof REMOVE_PRODUCT;
  payload: { product: Product };
};

export type ToggleDialogAction = {
  type: typeof TOGGLE_DIALOG;
  payload: {
    dialog: DialogType;
  };
};

export type UiActions = ToggleDialogAction;

// Use this union in reducer
export type ProductActions =
  | GetProductsAction
  | AddProductAction
  | RemoveProductAction;

export type ProductState = {
  allProducts: Product[];
  inCart: Product[];
};

// Using dynamic keys from an enum
export type UiState = {
  dialogOpen: {
    [key in DialogType]?: boolean;
  };
};

export type AppState = {
  product: ProductState;
  ui: UiState;
};
