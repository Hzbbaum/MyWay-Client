import React from "react";
import { useSelector } from "react-redux";
import Logo from "../../assets/Logo";
import { LOGGED_IN } from "../../redux/appStateTypes";
import LoginForm from "./LoginForm";
import LogoutButton from "./LogoutButton";
import "./header.scss";

function Header() {
  const user = useSelector((state) => state.user);
  const loggedin = useSelector((state) =>
    state.appState === LOGGED_IN ? true : false
  );

  return (
    <div className="header">
      <div className="left">
        <Logo />
        <h2>MY WAY</h2>
      </div>
      <div className="right">
        {loggedin ? (
          <span>
            hello {user.name}
          </span>
        ) : null}
        {loggedin ? <LogoutButton /> : <LoginForm />}
      </div>
    </div>
  );
}

export default Header;
