import { LOGIN, LOGOUT_USER } from "../actionTypes";

const initialState = {
  
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN: {
      return {...action.payload };
    }
    case LOGOUT_USER: {
      return { };
    }
    default:
      return { ...state };
  }
}
