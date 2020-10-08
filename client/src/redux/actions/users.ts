import { Dispatch } from "redux";

import {
  LOGIN,
  SIGNUP,
  GOOGLE_LOGIN,
  UserActions,
  User,
  CurrUser,
  LOGOUT,
} from "../../types";
import { signUpReq, logInReq, loginGoogleReq } from "../../api";

function login(data: CurrUser): UserActions {
  return {
    type: LOGIN,
    payload: { user: data },
  };
}

export function googleLogin(data: CurrUser): UserActions {
  return {
    type: GOOGLE_LOGIN,
    payload: { user: data },
  };
}

function logout(): UserActions {
  return { type: LOGOUT };
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

export function loginWithGoogle(res: any): any {
  return async (dispatch: Dispatch) => {
    const { data } = await loginGoogleReq();
    return dispatch(googleLogin(data));
  };
}
