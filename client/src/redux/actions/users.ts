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
  GET_USER_REQ,
  GET_USER_FAIL,
  UPDATE_USER_REQ,
  UPDATE_USER_FAIL,
  UserActions,
  User,
} from "../../types";
import { loginGoogleReq } from "../../api";

const rootURL = "http://localhost:5000/api/v1/users";

//////// ACTIONS TO DISPATCH INSIDE
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

export function googleLoginFail(error: any): UserActions {
  return {
    type: GOOGLE_LOGIN_REQ,
    payload:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
  };
}

function signUpFail(error: any): UserActions {
  return {
    type: SIGNUP_FAIL,
    payload:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
  };
}

function getUser(data: User): UserActions {
  return {
    type: GET_USER_REQ,
    payload: { user: data },
  };
}

function getUserFail(error: any): UserActions {
  return {
    type: GET_USER_FAIL,
    payload:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
  };
}

function updateUser(data: User): UserActions {
  return {
    type: UPDATE_USER_REQ,
    payload: { user: data },
  };
}

function updateUserFail(error: any): UserActions {
  return {
    type: UPDATE_USER_FAIL,
    payload:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
  };
}

//////// ACTIONS TO DISPATCH OUTSIDE
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
      // localStorage.setItem("user", JSON.stringify(data));
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
      // localStorage.setItem("user", JSON.stringify(data));
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

export function getUserData(id: string): any {
  return async (dispatch: Dispatch, getState: any) => {
    try {
      const { user } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`${rootURL}/${id}`, config);
      dispatch(getUser(data));
    } catch (err) {
      dispatch(getUserFail(err));
    }
  };
}

export function updateUserData(userData: User): any {
  return async (dispatch: Dispatch, getState: any) => {
    try {
      const { user } = getState();
      console.log("user: ", user);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.user.token}`,
        },
      };
      console.log(userData);
      const { data } = await axios.patch(
        `${rootURL}/profile`,
        userData,
        config
      );
      console.log(data);
      dispatch(updateUser(data));
    } catch (err) {
      dispatch(updateUserFail(err));
      console.log(err);
    }
  };
}
