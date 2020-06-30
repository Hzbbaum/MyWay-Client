import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { LOGIN } from "../../redux/actionTypes";

const LoginForm = () => {
  let name;
  let password;
  const [message, setmessage] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    e.target[0].value = "";
    e.target[1].value = "";
    const body = {};
    body.name = name;
    body.password = password;
    let usersDB = require("../../fakeDB/users.json").users;
    let userExists = usersDB.find(
      (user) => user.name === name && user.password === password
    );
    if (userExists) {
      setmessage("");
      dispatch({ type: LOGIN, payload: {...body} });
    } else setmessage("incorrect login info");
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
    <div>
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
            Log-in!
          </button>
          {message ? <span className="message">{message}</span> : null}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
