import { UIActions, ACTION_FAIL, LOADING } from "../../types";

export function actionFail(error: any): UIActions {
  return {
    type: ACTION_FAIL,
    payload:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
  };
}

export function loading(): UIActions {
  return { type: LOADING };
}
