import { LOGGED_OUT, LOGGED_IN } from '../appStateTypes'
import { LOGIN, LOGOUT_USER } from '../actionTypes';

const initialState = {
  appState: LOGGED_OUT,
};

export default function(state = initialState, action) {
  switch (action.type) {
      case LOGIN: {
          return {
          ...state,
          appState:LOGGED_IN
          }
      }
      case LOGOUT_USER: {
          return {
              ...state,
              appState:LOGGED_OUT
          }
      }
  default:
    return state;
}
}