import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LOGIN } from "../../redux/actionTypes";
import "./trip.scss";

const Trip = (trip) => {
  const [classes, setclasses] = useState(
    trip.tripinfo.follow ? "bottom clicked" : "bottom"
  );

  const [followed, setFollowed] = useState(false);
  const user = useSelector((state) => state.user);
  const vacation_id = trip.tripinfo.vacation_id;
  const dispatch = useDispatch();

  const followHandler = (event) => {
    if (followed) {
      event.preventDefault();
      setclasses("bottom");
      setFollowed(false);
    } else {
      setclasses("bottom clicked");
      setFollowed(true);
    }
    if (user.follows.includes(+vacation_id))
      user.follows = user.follows.filter(item => item!==+vacation_id);
    else user.follows.push(+vacation_id);
    dispatch({ type: LOGIN, payload: user });
  };

  return (
    <div className="wrapper">
      <div className="container">
        <div
          className="top"
          style={{ backgroundImage: `url(${trip.tripinfo.pic})` }}
        ></div>
        <div className={classes}>
          <div className="left">
            <div className="details">
              <h1>{trip.tripinfo.destination}</h1>
              <p>{trip.tripinfo.price_usd}$</p>
            </div>
            <div className="buy" onClick={followHandler}>
              <i className="material-icons">favorite</i>
            </div>
          </div>
          <div className="right">
            <div className="done">
              <i className="material-icons">done</i>
            </div>
            <div className="details">
              <h1>{trip.tripinfo.destination}</h1>
              <p>Added to your watchlist</p>
            </div>
            <div className="remove" onClick={followHandler}>
              <i className="material-icons">clear</i>
            </div>
          </div>
        </div>
      </div>
      <div className="inside">
        <div className="icon">
          <i className="material-icons">info_outline</i>
        </div>
        <div className="contents">
          <table>
            <tbody>
              <tr>
                <th>start</th>
                <th>end</th>
              </tr>
              <tr>
                <td>{trip.tripinfo.sdate}</td>
                <td>{trip.tripinfo.edate}</td>
              </tr>
            </tbody>
          </table>
          <p>{trip.tripinfo.description}</p>
          <h3>only for {trip.tripinfo.price_usd}$</h3>
        </div>
      </div>
    </div>
  );
};

export default Trip;
