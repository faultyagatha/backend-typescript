import {
  UIState,
  UIActions,
  ACTION_FAIL,
  LOADING,
  RESET_UI,
} from "../../types";

export default function ui(
  state: UIState = {
    error: null,
    isLoading: false,
  },
  action: UIActions
): any {
  switch (action.type) {
    case LOADING: {
      return { ...state, isLoading: true };
    }
    case ACTION_FAIL: {
      const error = action.payload;
      return { ...state, error };
    }
    case RESET_UI: {
      return { ...state, isLoading: false, error: null };
    }

    default:
      return state;
  }
}
