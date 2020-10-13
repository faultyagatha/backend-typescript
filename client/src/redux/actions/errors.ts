import { ErrorAction, ACTION_FAIL } from "../../types";

export function actionFail(error: any): ErrorAction {
  return {
    type: ACTION_FAIL,
    payload:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
  };
}
