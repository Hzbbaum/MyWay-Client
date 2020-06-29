import { UPDATE_TRIPS, LOGIN, LOGOUT } from "./actionTypes";

export const updateTrips = (content) => ({
  type: UPDATE_TRIPS,
  payload: {
    content,
  },
});

export const login = (user) => ({
  type: LOGIN,
  payload: { user },
});

export const logout = () => ({
  type: LOGOUT,
  payload: {},
});
