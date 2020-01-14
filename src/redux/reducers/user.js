import { LOGIN, LOGOUT_USER } from "../actionTypes";

const initialState = {
  user: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
        case LOGIN: {
            return {
                ...state,
                user:action.payload
            }
        }
        case LOGOUT_USER: {
            return {
                ...state,
                user:{}
            }
        }
    default:
      return state;
  }
}
