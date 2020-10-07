import { Dispatch } from "redux";

import {
  LOGIN,
  SIGNUP,
  UserActions,
  User,
  LoggedInUser,
  LOGOUT,
} from "../../types";
import { signUpReq, logInReq } from "../../services";

function login(data: LoggedInUser): UserActions {
  return {
    type: LOGIN,
    payload: { user: data },
  };
}

function logout(): UserActions {
  return {
    type: LOGOUT,
  };
}

function signUp(data: User): UserActions {
  return {
    type: SIGNUP,
    payload: { user: data },
  };
}

export function signUpUser(): any {
  return async (dispatch: Dispatch) => {
    const { data } = await signUpReq();
    console.log(data);
    return dispatch(signUp(data));
  };
}

export function loginUser(): any {
  return async (dispatch: Dispatch) => {
    const { data } = await logInReq();
    console.log(data);
    return dispatch(login(data));
  };
}
