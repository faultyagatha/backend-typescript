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
  GET_USERS_ADMIN,
  GET_USERS_ADMIN_FAIL,
  UPDATE_USER_ADMIN,
  UPDATE_USER_ADMIN_FAIL,
} from "../../types";

export default function user(
  state: UserState = {
    user: {},
    allUsers: [],
    error: null,
    success: false,
  },
  action: UserActions
): UserState {
  switch (action.type) {
    case LOGIN_REQ: {
      const { user } = action.payload;
      return { ...state, user, success: true };
    }
    case LOGIN_FAIL: {
      const error = action.payload;
      return { ...state, error };
    }
    case SIGNUP_REQ: {
      const { user } = action.payload;
      console.log(user);
      return { ...state, user, success: true };
    }
    case SIGNUP_FAIL: {
      const error = action.payload;
      return { ...state, error };
    }
    case LOGOUT_REQ: {
      const { user } = action.payload;
      return { ...state, user, success: true };
    }
    case GET_USER_REQ: {
      const { user } = action.payload;
      return { ...state, user, success: true };
    }
    case GET_USER_FAIL: {
      const error = action.payload;
      return { ...state, error };
    }
    case UPDATE_USER_REQ: {
      const { user } = action.payload;
      return { ...state, user, success: true };
    }
    case UPDATE_USER_FAIL: {
      const error = action.payload;
      return { ...state, error };
    }
    case GET_USERS_ADMIN: {
      const { allUsers } = action.payload;
      return { ...state, allUsers, success: true };
    }
    case GET_USERS_ADMIN_FAIL: {
      const error = action.payload;
      return { ...state, error };
    }
    case UPDATE_USER_ADMIN: {
    }
    case UPDATE_USER_ADMIN_FAIL: {
      const error = action.payload;
      return { ...state, error };
    }
    default:
      return state;
  }
}
