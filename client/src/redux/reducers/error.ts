import {
  // ErrorState,
  ErrorAction,
  ACTION_FAIL,
} from "../../types";

export default function error(
  state: any = {
    error: null,
  },
  action: ErrorAction
): any {
  switch (action.type) {
    case ACTION_FAIL: {
      const error = action.payload;
      return { ...state, error };
    }
    default:
      return state;
  }
}
