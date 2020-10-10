import {
  UserState,
  UserActions,
  LOGIN_REQ,
  LOGOUT_REQ,
  SIGNUP_REQ,
  LOGIN_FAIL,
  LOGOUT_FAIL,
  SIGNUP_FAIL,
} from "../../types";

export default function user(
  state: UserState = {
    user: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    error: null,
  },
  action: UserActions
): UserState {
  switch (action.type) {
    case LOGIN_REQ: {
      const { user } = action.payload;
      return { ...state, user };
    }
    case SIGNUP_REQ: {
      const { user } = action.payload;
      console.log(user);
      return { ...state, user };
    }
    case LOGOUT_REQ: {
      return state;
    }
    case LOGIN_FAIL: {
      const { error } = action.payload;
      return { ...state, error };
    }
    case SIGNUP_FAIL: {
      const { error } = action.payload;
      return { ...state, error };
    }
    default:
      return state;
  }
}
