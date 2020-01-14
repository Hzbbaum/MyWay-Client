import { UPDATE_TRIPS, LOGIN, LOGOUT, SET_ADMIN } from "./actionTypes";

export const updateTrips = content => ({
  type: UPDATE_TRIPS,
  payload: {
    content
  }
});

export const login = user => ({
  type: LOGIN,
  payload: { user }
});

export const logout = () => ({
    type: LOGOUT,
    payload: {  }
  });

  export const setAdmin = (newAppState) => ({
    type: SET_ADMIN,
    payload: { newAppState }
  });
