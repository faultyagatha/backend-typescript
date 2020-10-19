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
  UPDATE_USER_ADMIN,
  DELETE_USER_ADMIN,
  UserActions,
  User,
} from "../../types";
import { actionFail } from "./errors";

const rootURL = "http://localhost:5000/api/v1/users";

const authFetches = {
  loginFetch: async (email: string, password: string) => {
    try {
      const res = await fetch(`${rootURL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accepts: "application/json",
          token: localStorage.getItem("token") as string,
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      return res.json();
    } catch (err) {
      console.log("login fetch failed", err);
    }
  },
  signUpFetch: async (
    email: string,
    password: string,
    passwordConfirm: string
  ) => {
    try {
      const res = await fetch(`${rootURL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accepts: "application/json",
          token: localStorage.getItem("token") as string,
        },
        body: JSON.stringify({
          email,
          password,
          passwordConfirm,
        }),
      });
      return res.json();
    } catch (err) {
      console.log("signup fetch failed", err);
    }
  },
};

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

function updateUserAdmin(data: User): UserActions {
  return {
    type: UPDATE_USER_ADMIN,
    payload: { user: data },
  };
}

function deleteUserAdmin(): UserActions {
  return { type: DELETE_USER_ADMIN };
}

export function signUpUser(
  email: string,
  password: string,
  passwordConfirm: string
): any {
  return async (dispatch: Dispatch) => {
    try {
      const data = await authFetches.signUpFetch(
        email,
        password,
        passwordConfirm
      );
      if (data.token) {
        localStorage.setItem("token", data.token);
        dispatch(signUp(data));
      } else {
        console.log(data.error);
      }
    } catch (err) {
      return dispatch(actionFail(err));
    }
  };
}

export function loginUser(email: string, password: string): any {
  return async (dispatch: Dispatch) => {
    try {
      const data = await authFetches.loginFetch(email, password);
      if (data.token) {
        localStorage.setItem("token", data.token);
        dispatch(login(data));
      } else {
        console.log(data.error);
      }
    } catch (err) {
      return dispatch(actionFail(err));
    }
  };
}

export function loginWithGoogle(): any {
  return async (dispatch: Dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: token,
      };
      const { data } = await axios.post(`${rootURL}/login/google`, config);
      return dispatch(googleLogin(data));
    } catch (err) {
      return dispatch(actionFail(err));
    }
  };
}

export function logoutUser(): any {
  return async (dispatch: Dispatch) => {
    localStorage.removeItem("token");
    dispatch(logout());
  };
}

export function getUserData(id: string): any {
  return async (dispatch: Dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
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
  return async (dispatch: Dispatch) => {
    try {
      let token = localStorage.getItem("token");
      console.log("token from local storage: ", token);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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

export function getAllUsersByAdmin() {
  return async (dispatch: Dispatch) => {
    try {
      let token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(`${rootURL}`, config);

      dispatch(getUsersAdmin(data));
    } catch (err) {
      dispatch(actionFail(err));
    }
  };
}

export function updateUserByAdmin(userData: User) {
  return async (dispatch: Dispatch) => {
    try {
      let token = localStorage.getItem("token");
      const id = userData._id;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.patch(`${rootURL}/${id}`, userData, config);
      dispatch(updateUserAdmin(data));
    } catch (err) {
      dispatch(actionFail(err));
    }
  };
}

export function deleteUserByAdmin(id: string) {
  return async (dispatch: Dispatch) => {
    try {
      let token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
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

/*
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
          token: localStorage.getItem("token")
        },
      };
      const { data } = await axios.post(
        `${rootURL}/signup`,
        { email, password, passwordConfirm },
        config
      );
      if (data.token) {
        localStorage.setItem("token", JSON.stringify(data.token));
      } else {
        console.log('no token');
      }
      return dispatch(signUp(data));

    } catch (err) {
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
          token: localStorage.getItem("token")
        },
      };
      const { data } = await axios.post(
        `${rootURL}/login`,
        { email, password },
        config
      );
      if (data.token) {
        localStorage.setItem("token", JSON.stringify(data.token));
      } else {
        console.log('no token');
      }
      console.log("front end login axios", data);
      return dispatch(login(data));
    } catch (err) {
      return dispatch(actionFail(err));
    }
  };
}
*/
