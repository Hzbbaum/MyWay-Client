import { combineReducers } from "redux";
import trips from "./trips";
import user from "./user"
import appState from './appState';

export default combineReducers({ trips, user, appState });
