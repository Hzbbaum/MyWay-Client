import React, { useEffect } from "react";
import "./App.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/HeaderComponents/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Trips from "./components/TripsComponent/Trips";
import Page404 from "./components/Page404";
import Register from "./components/Register";

import bgImg from "../src/assets/anotherbeach.jpg";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_TRIPS } from "./redux/actionTypes";

function MyWayApp() {
  const user_id = useSelector((state) => state.user.user_id);
  const trips = useSelector((state) => state.trips);
  const appstate = useSelector((state) => state.appState);

  const dispatch = useDispatch();
  // on load, we fetch all trips for the user (sorted by the server so that followed should be first)
  useEffect(
    () => {
      let tripsDB = require("./fakeDB/trips.json").trips;
      if (!checkTripArrayIdentical(tripsDB, trips)) {
        dispatch({ type: UPDATE_TRIPS, payload: tripsDB });
      }
    },
    // we would like to update this if user_id changes. dispatch is just here so the eslint dosen't whine.
    [user_id, dispatch, appstate, trips]
  );

  return (
    <div className="App">
      <img className="background" src={bgImg} alt="beach" />
      <Header />
      <BrowserRouter>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/trips">
            <Trips />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="*">
            <Page404 />
          </Route>
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default MyWayApp;

/**
 * returns true if all trips in a pair of trips arrays are true
 **/
function checkTripArrayIdentical(tripsNew, tripsState) {
  if (!Array.isArray(tripsNew) || !Array.isArray(tripsState)) return false;
  if (tripsNew.length !== tripsState.length) return false;
  for (let i = 0; i < tripsNew.length; i++) {
    if (!checkPairTripsIdentical(tripsNew[i], tripsState[i])) return false;
  }
  return true;
}
/**
 * returns true if all values if all values in a pair of trips are equal
 * @param {*} newTrip
 * @param {*} tripfromState
 */
function checkPairTripsIdentical(newTrip, tripfromState) {
  if (
    newTrip.vacation_id === tripfromState.vacation_id &&
    newTrip.pic === tripfromState.pic &&
    newTrip.destination === tripfromState.destination &&
    newTrip.price_usd === tripfromState.price_usd &&
    newTrip.sdate === tripfromState.sdate &&
    newTrip.edate === tripfromState.edate &&
    newTrip.description === tripfromState.description
  )
    return true;
  else {
    return false;
  }
}
