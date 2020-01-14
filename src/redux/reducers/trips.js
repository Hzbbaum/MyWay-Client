import { UPDATE_TRIPS, LOGOUT_TRIPS } from "../actionTypes";

const initialState = {
  trips: [],
};

export default function(state = initialState, action) {
    switch (action.type) {
        case UPDATE_TRIPS: {
            return {
            ...state,
            trips: action.payload,
            }
        }
        case LOGOUT_TRIPS: {
            return {
                ...state,
                trips: [],
            }
        }
    default:
      return state;
  }
}
