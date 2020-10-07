import { UserState, UserActions, LOGIN, SIGNUP } from "../../types";

export default function user(
  state: UserState = {
    user: {},
  },
  action: UserActions
): UserState {
  switch (action.type) {
    case LOGIN: {
      const { user } = action.payload;
      return { ...state, user };
    }
    case SIGNUP: {
      const { user } = action.payload;
      return { ...state, user };
    }
    default:
      return state;
  }
}
