import { UIState, UIActions, ACTION_FAIL, LOADING } from "../../types";

export default function ui(
  state: UIState = {
    error: null,
    isLoading: false,
  },
  action: UIActions
): any {
  switch (action.type) {
    case ACTION_FAIL: {
      const error = action.payload;
      return { ...state, error };
    }
    case LOADING: {
      return { ...state, isLoading: true };
    }
    default:
      return state;
  }
}
