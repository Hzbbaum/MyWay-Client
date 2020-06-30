import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN } from "../redux/actionTypes";
import { LOGGED_IN, LOGGED_OUT } from "../redux/appStateTypes";

import "./register.scss";
const Register = () => {
  const appstate = useSelector((state) => state.appState);
  let route;
  switch (appstate) {
    case LOGGED_IN:
      route = <Redirect exact to="/trips" />;
      break;
    case LOGGED_OUT:
      route = null;
      break;
    default:
      break;
  }

  let name;
  let password;
  const [message, setmessage] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    console.log("quack");
    e.preventDefault();
    e.target[0].value = "";
    e.target[1].value = "";
    const body = {};
    body.name = name;
    body.password = password;
    body.follows = []
    let userDB = require("../fakeDB/users.json").users;
    if (userDB.find((user) => user.name === body.name))
      setmessage("username is already taken");
    else {
      setmessage("");
      dispatch({ type: LOGIN, payload: body });
    }
  };

  const changeHandler = (e) => {
    switch (e.target.name) {
      case "name":
        name = e.target.value;
        break;
      case "password":
        password = e.target.value;
        break;
      default:
        break;
    }
  };
  return (
    <div className="registerForm main">
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="name"> User name: </label>
          <input
            type="text"
            required
            autoComplete="off"
            name="name"
            value={name}
            onChange={changeHandler}
          />
        </div>

        <div>
          {route}
          <label htmlFor="password">password: </label>
          <input
            type="password"
            required
            minLength="6  "
            autoComplete="off"
            name="password"
            value={password}
            onChange={changeHandler}
          />
        </div>
        <div>
          <button className="login" type="submit">
            Sign Up!
          </button>
          {message ? <span className="message">{message}</span> : null}
        </div>
      </form>
    </div>
  );
};

export default Register;
