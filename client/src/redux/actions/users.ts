import { Dispatch } from "redux";
import axios from "axios";

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

const rootURL = "http://localhost:5000/api/v1/users";

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
  return {
    type: LOGOUT_REQ,
    payload: { user: {} },
  };
}

function signUp(data: User): UserActions {
  return {
    type: SIGNUP_REQ,
    payload: { user: data },
  };
}

function loginFail(error: any): UserActions {
  return {
    type: LOGIN_FAIL,
    payload:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
  };
}

// function loginFail(error: any): UserActions {
//   return {
//     type: LOGIN_FAIL,
//     payload:
//       error && error.message
//         ? error.message
//         : error,
//   };
// }

export function googleLoginFail(data: any): UserActions {
  return {
    type: GOOGLE_LOGIN_REQ,
    payload:
      data.response && data.response.data.message
        ? data.response.data.message
        : data.message,
  };
}

function signUpFail(data: any): UserActions {
  return {
    type: SIGNUP_FAIL,
    payload:
      data.response && data.response.data.message
        ? data.response.data.message
        : data.message,
  };
}

export function signUpUser(
  email: string,
  password: string,
  passwordConfirm: string
): any {
  return async (dispatch: Dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${rootURL}/signup`,
        { email, password, passwordConfirm },
        config
      );
      console.log("axios req: ", data);
      localStorage.setItem("user", JSON.stringify(data));
      return dispatch(signUp(data));
    } catch (err) {
      console.log("error action: ", err);
      return dispatch(signUpFail(err));
    }
  };
}

export function loginUser(email: string, password: string): any {
  return async (dispatch: Dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${rootURL}/login`,
        { email, password },
        config
      );
      console.log(data);
      localStorage.setItem("user", JSON.stringify(data));
      return dispatch(login(data));
    } catch (err) {
      console.log("error action: ", err);
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
