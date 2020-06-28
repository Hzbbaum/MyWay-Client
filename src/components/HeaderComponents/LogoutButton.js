import React from "react";
import { LOGOUT_TRIPS, LOGOUT_USER } from "../../redux/actionTypes";
import { useDispatch } from "react-redux";

const LogoutButton = () => {
  const dispatch = useDispatch();

  const logOutHandler = (e) => {
    dispatch({ type: LOGOUT_TRIPS });
    dispatch({ type: LOGOUT_USER });
    localStorage.setItem("refreshToken", null);
    localStorage.setItem("accessToken", null);
  };

  return (
    <div>
      <button className="login" onClick={logOutHandler}>
        {" "}
        logout
      </button>
    </div>
  );
};

export default LogoutButton;
