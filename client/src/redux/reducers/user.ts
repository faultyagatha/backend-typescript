import {
  UserState,
  UserActions,
  LOGIN_REQ,
  LOGOUT_REQ,
  SIGNUP_REQ,
  LOGIN_FAIL,
  SIGNUP_FAIL,
  GET_USER_REQ,
  GET_USER_FAIL,
  UPDATE_USER_REQ,
  UPDATE_USER_FAIL,
} from "../../types";

export default function user(
  state: UserState = {
    user: {},
    error: null,
  },
  action: UserActions
): UserState {
  switch (action.type) {
    case LOGIN_REQ: {
      const { user } = action.payload;
      return { ...state, user };
    }
    case LOGIN_FAIL: {
      const error = action.payload;
      return { ...state, error };
    }
    case SIGNUP_REQ: {
      const { user } = action.payload;
      console.log(user);
      return { ...state, user };
    }
    case SIGNUP_FAIL: {
      const error = action.payload;
      return { ...state, error };
    }
    case LOGOUT_REQ: {
      const { user } = action.payload;
      return { ...state, user };
    }
    case GET_USER_REQ: {
      const { user } = action.payload;
      return { ...state, user };
    }
    case GET_USER_FAIL: {
      const error = action.payload;
      return { ...state, error };
    }
    case UPDATE_USER_REQ: {
      const { user } = action.payload;
      return { ...state, user };
    }
    case UPDATE_USER_FAIL: {
      const error = action.payload;
      return { ...state, error };
    }
    default:
      return state;
  }
}
