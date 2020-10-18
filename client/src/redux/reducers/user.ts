import {
  UserState,
  UserActions,
  LOGIN_REQ,
  LOGOUT_REQ,
  SIGNUP_REQ,
  GET_USER_REQ,
  UPDATE_USER_REQ,
  GET_USERS_ADMIN,
  UPDATE_USER_ADMIN,
  DELETE_USER_ADMIN,
} from "../../types";

export default function user(
  state: UserState = {
    user: {},
    allUsers: [],
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
      const { user } = action.payload;
      return { ...state, user };
    }
    case GET_USER_REQ: {
      const { user } = action.payload;
      return { ...state, user };
    }
    case UPDATE_USER_REQ: {
      const { user } = action.payload;
      return { ...state, user };
    }
    case GET_USERS_ADMIN: {
      const { allUsers } = action.payload;
      return { ...state, allUsers };
    }
    case UPDATE_USER_ADMIN: {
      const { user } = action.payload;
      return { ...state, user };
    }
    case DELETE_USER_ADMIN: {
      return { ...state };
    }
    default:
      return state;
  }
}
