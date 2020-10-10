import { Dispatch } from "redux";

import {
  LOGIN_REQ,
  SIGNUP_REQ,
  GOOGLE_LOGIN_REQ,
  LOGOUT_REQ,
  LOGIN_FAIL,
  SIGNUP_FAIL,
  GOOGLE_LOGIN_FAIL,
  UserActions,
  User,
} from "../../types";
import { signUpReq, logInReq, loginGoogleReq } from "../../api";

function login(data: User): UserActions {
  return {
    type: LOGIN_REQ,
    payload: { user: data },
  };
}

export function googleLogin(data: User): UserActions {
  return {
    type: GOOGLE_LOGIN_REQ,
    payload: { user: data },
  };
}

function logout(): UserActions {
  return { type: LOGOUT_REQ };
}

function signUp(data: User): UserActions {
  return {
    type: SIGNUP_REQ,
    payload: { user: data },
  };
}

function loginFail(data: any): UserActions {
  return {
    type: LOGIN_FAIL,
    payload: { error: data },
  };
}

export function googleLoginFail(data: any): UserActions {
  return {
    type: GOOGLE_LOGIN_REQ,
    payload: { error: data },
  };
}

function signUpFail(data: any): UserActions {
  return {
    type: SIGNUP_FAIL,
    payload: { error: data },
  };
}

export function signUpUser(): any {
  return async (dispatch: Dispatch) => {
    try {
      const { data } = await signUpReq();
      console.log(data);
      localStorage.setItem("user", JSON.stringify(data));
      return dispatch(signUp(data));
    } catch (err) {
      return dispatch(signUpFail(err));
    }
  };
}

export function loginUser(): any {
  return async (dispatch: Dispatch) => {
    try {
      const { data } = await logInReq();
      console.log(data);
      localStorage.setItem("user", JSON.stringify(data));
      return dispatch(login(data));
    } catch (err) {
      return dispatch(loginFail(err));
    }
  };
}

export function loginWithGoogle(res: any): any {
  return async (dispatch: Dispatch) => {
    try {
      const { data } = await loginGoogleReq();
      return dispatch(googleLogin(data));
    } catch (err) {
      return dispatch(googleLoginFail(err));
    }
  };
}

export function logoutUser(): any {
  return async (dispatch: Dispatch) => {
    localStorage.removeItem("user");
    dispatch(logout());
  };
}
