import { SET_ADMIN } from "../actionTypes";
import { LOGGED_OUT } from '../appStateTypes'

const initialState = {
  appState: LOGGED_OUT,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_ADMIN: {
            return {
            ...state,
            appState: action.payload
            }
        }
    default:
      return state;
  }
}
