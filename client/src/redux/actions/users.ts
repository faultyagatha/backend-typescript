import { Dispatch } from "redux";
import axios from "axios";

import {
  LOGIN_REQ,
  SIGNUP_REQ,
  GOOGLE_LOGIN_REQ,
  LOGOUT_REQ,
  GET_USER_REQ,
  UPDATE_USER_REQ,
  GET_USERS_ADMIN,
  DELETE_USER_ADMIN,
  UserActions,
  User,
} from "../../types";
import { actionFail } from "./errors";

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

function getUser(data: User): UserActions {
  return {
    type: GET_USER_REQ,
    payload: { user: data },
  };
}

function updateUser(data: User): UserActions {
  return {
    type: UPDATE_USER_REQ,
    payload: { user: data },
  };
}

function getUsersAdmin(data: User[]): UserActions {
  return {
    type: GET_USERS_ADMIN,
    payload: { allUsers: data },
  };
}

function deleteUserAdmin(): UserActions {
  return {
    type: DELETE_USER_ADMIN,
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
      // localStorage.setItem("user", JSON.stringify(data));
      return dispatch(signUp(data));
    } catch (err) {
      console.log("error action: ", err);
      return dispatch(actionFail(err));
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
      // console.log(data);
      // localStorage.setItem("user", JSON.stringify(data));
      return dispatch(login(data));
    } catch (err) {
      // console.log("error action: ", err);
      return dispatch(actionFail(err));
    }
  };
}

export function loginWithGoogle(res: any): any {
  return async (dispatch: Dispatch, getState: any) => {
    try {
      const { user } = getState();
      console.log(user);
      const config = {
        headers: user.user.token,
      };
      console.log("googleLogin token: ", user.user.token, "config: ", config);
      const { data } = await axios.post(`${rootURL}/login/google`, config);
      return dispatch(googleLogin(data));
    } catch (err) {
      return dispatch(actionFail(err));
    }
  };
}

export function logoutUser(): any {
  return async (dispatch: Dispatch) => {
    // localStorage.removeItem("user");
    dispatch(logout());
  };
}

export function getUserData(id: string): any {
  return async (dispatch: Dispatch, getState: any) => {
    try {
      const { user } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${user.user.token}`,
        },
      };
      const { data } = await axios.get(`${rootURL}/${id}`, config);
      dispatch(getUser(data));
    } catch (err) {
      dispatch(actionFail(err));
    }
  };
}

export function updateUserData(userData: User): any {
  return async (dispatch: Dispatch, getState: any) => {
    try {
      const { user } = getState();
      let token = localStorage.getItem("token");
      console.log("user: ", user);
      console.log("token: ", token);
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
      dispatch(actionFail(err));
      console.log(err);
    }
  };
}

export function getAllUsers() {
  return async (dispatch: Dispatch, getState: any) => {
    try {
      const { user } = getState();
      // console.log(user.user.token)
      const config = {
        headers: {
          Authorization: `Bearer ${user.user.token}`,
        },
      };
      const { data } = await axios.get(`${rootURL}`, config);
      dispatch(getUsersAdmin(data));
    } catch (err) {
      dispatch(actionFail(err));
    }
  };
}

export function deleteUser(id: string) {
  return async (dispatch: Dispatch, getState: any) => {
    try {
      const { user } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${user.user.token}`,
        },
      };
      await axios.delete(`${rootURL}/${id}`, config);
      dispatch(deleteUserAdmin());
    } catch (err) {
      console.log("Action failed");
      dispatch(actionFail(err));
    }
  };
}
