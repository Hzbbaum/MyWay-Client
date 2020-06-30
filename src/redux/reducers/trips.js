import { UPDATE_TRIPS, LOGOUT_TRIPS } from "../actionTypes";

const initialState =  [] ;

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_TRIPS: {
      return [...action.payload] ;
    }
    case LOGOUT_TRIPS: {
      return [] ;
    }
    default:
      return [ ...state ];
  }
}
