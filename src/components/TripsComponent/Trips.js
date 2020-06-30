import React from "react";
import { Redirect } from "react-router-dom";
import { LOGGED_OUT, LOGGED_IN } from "../../redux/appStateTypes";
import { useSelector } from "react-redux";
import Trip from "./Trip";

const Trips = () => {
  const appstate = useSelector((state) => state.appState);
  const currentUser = useSelector((state) => state.user);
  let route;

  // a small switch that decides wether we need to redirect and where, based on appState
  switch (appstate) {
    case LOGGED_IN:
      route = null;
      break;
    case LOGGED_OUT:
      route = <Redirect exact to="/home" />;
      break;
    default:
      break;
  }

  const trips = useSelector((state) => {
    let tripsWithNoFollows = state.trips;
    tripsWithNoFollows.forEach((trip, index) => {
      if (currentUser.follows.includes((+trip.vacation_id))) {
        tripsWithNoFollows[index].follow = true;
      }
    });
    return tripsWithNoFollows;
  });

  return (
    <div className="tripContainer main">
      {route}
      {trips &&
        !route &&
        trips.map((trip) => <Trip tripinfo={trip} key={trip.vacation_id} />)}
    </div>
  );
};

export default Trips;
