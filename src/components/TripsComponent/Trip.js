import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./trip.scss";

const Trip = trip => {
  const [classes, setclasses] = useState("bottom");
  const [followed, setFollowed] = useState(false);
  const user_id = useSelector(state => state.user.user_id);
  const vacation_id = { vacation_id: trip.tripinfo.vacation_id };

  const followHandler = event => {
    if (followed) {
      event.preventDefault();
      setclasses("bottom");
      setFollowed(false);
    } else {
      setclasses("bottom clicked");
      setFollowed(true);
    }
    const aToken = localStorage.getItem("accessToken");
    setTimeout(() => {
      fetch("http://localhost:3000/vacations/follow", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + aToken,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user_id, vacation_id)
      })
        .then(response => {
          // we want the response even on error because it contains message
          let json = response.json();
          if (
            (response.status >= 200 && response.status < 300) ||
            (response.status >= 400 && response.status < 410)
          ) {
            return json;
          } else {
            return json.then(Promise.reject.bind(Promise));
          }
        })
        .then(data => {
        });
    }, 50);
  };

  return (
    <div className="wrapper">
      <div className="container">
        <div
          className="top"
          style={{ backgroundImage: `url(${trip.pic})` }}
        ></div>
        <div className={classes}>
          <div className="left">
            <div className="details">
              <h1>{trip.destination}</h1>
              <p>{trip.price_usd}$</p>
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
              <h1>{trip.destination}</h1>
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
                <td>{trip.sdate}</td>
                <td>{trip.edate}</td>
              </tr>
            </tbody>
          </table>
          <p>{trip.description}</p>
          <h3>only for {trip.price_usd}$</h3>
        </div>
      </div>
    </div>
  );
};

export default Trip;
